#!/usr/bin/env python3
"""
Script to extract text from OSRAM light bulb guide PDF
"""

try:
    import PyPDF2
    import sys
    import os
    import re
    
    def extract_text_from_osram_pdf(pdf_path):
        """Extract text from OSRAM PDF file"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    page_text = page.extract_text()
                    text += f"=== PAGE {page_num + 1} ===\n{page_text}\n\n"
                
                return text
        except Exception as e:
            return f"Error reading PDF: {str(e)}"
    
    def clean_osram_text(text):
        """Clean and structure the extracted text"""
        lines = text.split('\n')
        cleaned_lines = []
        
        for line in lines:
            # Remove extra whitespace
            clean_line = line.strip()
            if clean_line:
                cleaned_lines.append(clean_line)
        
        return '\n'.join(cleaned_lines)
    
    if __name__ == "__main__":
        pdf_file = "GUIDE AMPOULES OSRAM.pdf"
        output_file = "OSRAM_EXTRACTED_TEXT.txt"
        
        if os.path.exists(pdf_file):
            print(f"📖 Extracting text from {pdf_file}...")
            text = extract_text_from_osram_pdf(pdf_file)
            cleaned_text = clean_osram_text(text)
            
            # Save to file
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(cleaned_text)
            
            print(f"✅ Text extracted and saved to: {output_file}")
            print(f"📊 Total characters: {len(cleaned_text)}")
            
            # Show first 500 characters as preview
            print("\n📋 Preview of extracted text:")
            print("-" * 50)
            print(cleaned_text[:500])
            print("-" * 50)
            
        else:
            print(f"❌ PDF file not found: {pdf_file}")
            
except ImportError:
    print("PyPDF2 not available. Trying alternative method...")
    
    # Alternative: try to use pdfplumber if available
    try:
        import pdfplumber
        
        def extract_text_with_pdfplumber(pdf_path):
            """Extract text using pdfplumber"""
            try:
                with pdfplumber.open(pdf_path) as pdf:
                    text = ""
                    for page_num, page in enumerate(pdf.pages):
                        page_text = page.extract_text()
                        if page_text:
                            text += f"=== PAGE {page_num + 1} ===\n{page_text}\n\n"
                    return text
            except Exception as e:
                return f"Error reading PDF with pdfplumber: {str(e)}"
        
        if __name__ == "__main__":
            pdf_file = "GUIDE AMPOULES OSRAM.pdf"
            output_file = "OSRAM_EXTRACTED_TEXT.txt"
            
            if os.path.exists(pdf_file):
                print(f"📖 Extracting text from {pdf_file}...")
                text = extract_text_with_pdfplumber(pdf_file)
                
                # Save to file
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(text)
                
                print(f"✅ Text extracted and saved to: {output_file}")
                print(f"📊 Total characters: {len(text)}")
                
                # Show first 500 characters as preview
                print("\n📋 Preview of extracted text:")
                print("-" * 50)
                print(text[:500])
                print("-" * 50)
                
            else:
                print(f"❌ PDF file not found: {pdf_file}")
                
    except ImportError:
        print("Neither PyPDF2 nor pdfplumber available.")
        print("Please install one of them:")
        print("pip install PyPDF2")
        print("or")
        print("pip install pdfplumber")

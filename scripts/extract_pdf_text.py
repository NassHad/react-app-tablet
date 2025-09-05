#!/usr/bin/env python3
"""
Script to extract text from PDF files
"""

try:
    import PyPDF2
    import sys
    import os
    
    def extract_text_from_pdf(pdf_path):
        """Extract text from PDF file"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text() + "\n"
                
                return text
        except Exception as e:
            return f"Error reading PDF: {str(e)}"
    
    if __name__ == "__main__":
        pdf_file = "ILV FULMEN ENDURANCE.pdf"
        if os.path.exists(pdf_file):
            text = extract_text_from_pdf(pdf_file)
            print(text)
        else:
            print(f"PDF file not found: {pdf_file}")
            
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
                    for page in pdf.pages:
                        text += page.extract_text() + "\n"
                    return text
            except Exception as e:
                return f"Error reading PDF with pdfplumber: {str(e)}"
        
        if __name__ == "__main__":
            pdf_file = "ILV FULMEN ENDURANCE.pdf"
            if os.path.exists(pdf_file):
                text = extract_text_with_pdfplumber(pdf_file)
                print(text)
            else:
                print(f"PDF file not found: {pdf_file}")
                
    except ImportError:
        print("Neither PyPDF2 nor pdfplumber available.")
        print("Please install one of them:")
        print("pip install PyPDF2")
        print("or")
        print("pip install pdfplumber")

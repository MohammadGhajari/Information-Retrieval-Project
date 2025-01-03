import sys
import json

def main():
    # دریافت داده‌های JSON از آرگومان
    input_data = sys.argv[1]
    
    # تبدیل رشته JSON به دیکشنری پایتون
    try:
        data = json.loads(input_data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        sys.exit(1)

    # استخراج اطلاعات
    email = data.get("Email")
    sites = data.get("Sites")
    keywords = data.get("Keywords")

    # چاپ داده‌ها
    print(f'email = "{email}"')
    print(f'site = {sites}')
    print(f'keyword = {keywords}')

if __name__ == "__main__":
    main()

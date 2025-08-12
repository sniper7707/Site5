from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # السماح بطلبات CORS

# قاعدة بيانات مؤقتة (في تطبيق حقيقي استخدم SQLAlchemy)
services = [
    {"id": 1, "name": "Instagram Followers", "price": 15, "platform": "instagram"},
    {"id": 2, "name": "Facebook Likes", "price": 12, "platform": "facebook"},
    {"id": 3, "name": "TikTok Views", "price": 2.5, "platform": "tiktok"}
]

@app.route('/api/services', methods=['GET'])
def get_services():
    platform = request.args.get('platform', 'all')
    
    if platform == 'all':
        return jsonify(services)
    else:
        filtered = [s for s in services if s['platform'] == platform]
        return jsonify(filtered)

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    # في تطبيق حقيقي: حفظ الطلب في قاعدة البيانات
    print("New order received:", data)
    return jsonify({
        "success": True,
        "message": "تم استلام الطلب بنجاح",
        "order_id": 1001
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    # تطبيق حقيقي: التحقق من المستخدم وكلمة المرور
    return jsonify({
        "success": True,
        "user": {
            "id": 1,
            "username": "alaa_badeeh",
            "balance": 150.00
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)

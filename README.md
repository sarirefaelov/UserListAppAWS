#  מערכת ניהול משתמשים
**Angular + C# Web API 2**

---

## 🚀 הרצת הפרויקט

### Backend (C# API)
1. פתח את הפרויקט ב-Visual Studio
2. הרץ את הפרויקט (F5)
3. ה-API רץ על: `https://localhost:44380`

### Frontend (Angular)
1. פתח טרמינל בתיקיית Angular
2. הרץ את הפקודות:
   ```bash
   npm install
   ng serve
   ```
3. פתח דפדפן: `http://localhost:4200`

**⚠️ חשוב:** יש להריץ את שני החלקים במקביל!

---

## 📂 מבנה הפרויקט

```
├── Angular/              # Client Side
│   ├── src/app/
│   │   ├── components/user-list/
│   │   ├── services/user.service.ts
│   │   └── models/user.model.ts
│   └── package.json
│
└── API/                  # Server Side
    ├── Controllers/UsersController.cs
    ├── Models/User.cs
    └── App_Start/WebApiConfig.cs
```

---


## 📡 API Endpoints

| Method | Endpoint | תיאור |
|--------|----------|-------|
| GET | `/api/users` | קבלת כל המשתמשים |
| GET | `/api/users/{id}` | קבלת משתמש לפי ID |
| POST | `/api/users` | הוספת משתמש חדש |
| PUT | `/api/users/{id}` | עדכון משתמש קיים |
| DELETE | `/api/users/{id}` | מחיקת משתמש |

**דוגמת Request/Response:**
```json
// POST /api/users
{
  "Id": 0,
  "Name": "שם המשתמש"
}

// Response
{
  "Id": 17,
  "Name": "שם המשתמש"
}
```

---

## 💡 הערות טכניות

- השרת מחזיר **XML** ב-GET requests
- Angular מבצע **parsing של XML ל-JSON** באמצעות `fast-xml-parser`
- POST/PUT/DELETE עובדים עם **JSON**
- הנתונים נשמרים **ב-memory** בלבד (נאבדים באתחול)

---

## ⚙️ דרישות מערכת

- **Angular CLI** 12+
- **Visual Studio** 2019/2022
- **.NET Framework** 4.8
- **NuGet Package:** `Microsoft.AspNet.WebApi.Cors`

---

---

**זמן פיתוח:** ~4 שעות  
**תאריך:** פברואר 2026

---

<div align="center">
*

</div>

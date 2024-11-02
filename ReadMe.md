# API Portal Berita Sederhana

## Introduction
API ini terdiri dari 2 fitur utama yaitu fitur category dan news. Dalam API ini terdapat 2 role user yaitu role Admin dan role Visitor. Role Admin memiliki hak akses untuk login dan logout, menambah data category dan data news, melihat data category dan data news, mengupdate data category dan data news, menghapus data category dan data news. Sedangkan untuk role visitor memiliki hak akses untuk login dan logout, melihat list news, melihat detail news dan melakukan search news berdasarkan title.

## Technology
Dalam pembuatan API ini menggunakan beberapa tech stack seperti :
* Node js
* Express js
* JWT
* MySql
* prisma ORM

## Documentation
### Route Login
### POST `/login`
Endpoint ini digunakan untuk mengelola user yang akan login
### Pengujian
Jika user menginputkan email dan password yang sudah terdaftar seperti contoh dibawah, maka endpoint akan mengenerate sebuah token yang nantinya digunakan untuk membedakan user yang satu dengan lainnya. 
- **Request Body**
```json
{
    "email": "adhli212@gmail.com",
    "password": "password01"
}
```

- **Response**
```json
{
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyNjE3MjYsImV4cCI6MTczMDI5MDUyNn0.UHl2CqFqTBCFAcL1QgmSNdNDw2ZFxPLCa4Do6huDDe4"
   "expiredAt": "2024-10-30T12:15:26.711Z"
}
```
<br>
Jika user menginputkan email atau password yang salah ataupun email dan password yang belum terdaftar, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Body**
```json
{
    "email": "adhli212@gmail.com",
    "password": "password02"
}
```

- **Response**
```json
{
    "message": "Email atau Password salah"
}
```
<br>

### Route Categories
### GET `/categories`
Endpoint ini digunakan untuk mengakses data categories
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>
- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```
- **Response**
```json
{
    "message": "Data Categories",
    "categories": [
        {
            "id": 1,
            "name": "Politics"
        },
        {
            "id": 2,
            "name": "Sports"
        },
        {
            "id": 4,
            "name": "Health"
        }
    ]
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### POST `/categories`
Endpoint ini digunakan untuk menambah data categories
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Request Body**
```json
{
    "name" : "Breaking News"
}
```

- **Response**
```json
{
   "message": "Created Data Successfully",
   "new_category": {
       "id": 5,
       "name": "Breaking News"
    }
}
```
<br>
Jika user menginputkan nama category yang sudah terdaftar dalam database, maka endpoint akan mengembalikkan pesan error

<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

<br>

- **Request Body**

```json
{
    "name" : "Sports"
}
```

<br>

- **Response**
```json
{
    "message" : "Category name is already exist"
}
```

<br>

<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### GET `/categories/2`
Endpoint ini digunakan untuk mengakses data categories berdasarkan id category tertentu
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Response**
```json
{
  "message": "Data Category",
  "category": {
     "id": 2,
     "name": "Sports"
  }
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### PUT `/categories/5`
Endpoint ini digunakan untuk melakukan update pada data categories berdasarkan id category tertentu
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Request Body**
```json
{
    "name":"Breaking news updated"
}
```

- **Response**
```json
{
  "message": "Data Updated Successfully",
  "category_updated": {
      "id": 5,
      "name" : "Breaking news updated"
  }
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### DELETE `/categories/5`
Endpoint ini digunakan untuk menghapus data categories berdasarkan id category tertentu
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Response**
```json
{
    "message": "Data Category has been deleted"
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### Route News
### GET `/news`
Endpoint ini digunakan untuk mengakses semua data news
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Pada endpoint ini, user yang login mempunyai role Admin maupun role Visitor, dapat mengakses endpoint ini.
<br>

- **Request Headers role Admin**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Response**
```json
{
  "message": "Data News",
  "news": [
      {
          "id": 1,
          "category_id": 1,
          "users_id": 5,
          "title": "Judul berita 1",
          "body": "Isi berita 1",
          "created_at": "2024-10-29T06:38:40.262Z",
          "updated_at": "2024-10-29T06:38:40.262Z"
      },
      {
          "id": 2,
          "category_id": 1,
          "users_id": 5,
          "title": "Judul berita 2",
          "body": "Isi berita 2",
          "created_at": "2024-10-29T07:08:42.315Z",
          "updated_at": "2024-10-29T07:20:53.911Z"
      },
      {
          "id": 4,
          "category_id": 2,
          "users_id": 5,
          "title": "Cara meningkatkan berat badan",
          "body": "Isi berita 4",
          "created_at": "2024-10-29T09:47:36.293Z",
          "updated_at": "2024-10-29T09:47:36.293Z"
      }
  ]
}
```
<br>
Jika user yang login mempunyai role visitor <br>
<br>

- **Request Header Role Visitor**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
  "message": "Data News",
  "news": [
      {
          "id": 1,
          "category_id": 1,
          "users_id": 5,
          "title": "Judul berita 1",
          "body": "Isi berita 1",
          "created_at": "2024-10-29T06:38:40.262Z",
          "updated_at": "2024-10-29T06:38:40.262Z"
      },
      {
          "id": 2,
          "category_id": 1,
          "users_id": 5,
          "title": "Judul berita 2",
          "body": "Isi berita 2",
          "created_at": "2024-10-29T07:08:42.315Z",
          "updated_at": "2024-10-29T07:20:53.911Z"
      },
      {
          "id": 4,
          "category_id": 2,
          "users_id": 5,
          "title": "Cara meningkatkan berat badan",
          "body": "Isi berita 4",
          "created_at": "2024-10-29T09:47:36.293Z",
          "updated_at": "2024-10-29T09:47:36.293Z"
      }
  ]
}
```
<br>

### GET `/news/1`
Endpoint ini digunakan untuk mengakses data news berdasarkan id news tertentu
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Pada endpoint ini, user yang login mempunyai role Admin maupun role Visitor dapat mengakses endpoint ini.
<br>

- **Request Headers role Admin**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Response**
```json
{
    "message": "Data news",
    "news": {
        "id": 1,
        "category_id": 1,
        "users_id": 5,
        "title": "Judul berita 1",
        "body": "Isi berita 1",
        "created_at": "2024-10-29T06:38:40.262Z",
        "updated_at": "2024-10-29T06:38:40.262Z"
    }
}
```
<br>
Jika user yang login mempunyai role visitor <br>
<br>

- **Request Header Role Visitor**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Data news",
    "news": {
        "id": 1,
        "category_id": 1,
        "users_id": 5,
        "title": "Judul berita 1",
        "body": "Isi berita 1",
        "created_at": "2024-10-29T06:38:40.262Z",
        "updated_at": "2024-10-29T06:38:40.262Z"
    }
}
```
<br>

### POST `/news`
Endpoint ini digunakan untuk menambah data news
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Request Body**
```json
{
    "category_id": 4,
    "title" : "Judul berita 5",
    "body" : "Isi berita 5"
}
```

- **Response**
```json
{
    "message": "Data created successfully",
    "news": {
        "id": 5,
        "category_id": 4,
        "users_id": 5,
        "title": "Judul berita 5",
        "body": "Isi berita 5",
        "created_at": "2024-10-30T05:44:17.009Z",
        "updated_at": "2024-10-30T05:44:17.009Z"
    }
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### PUT `/news/2`
Endpoint ini digunakan untuk melakukan update pada data news berdasarkan id news tertentu
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Request Body**
```json
{
    "title" : "Judul berita 2 updated",
    "body" : "Isi berita 2 updated"
}
```

- **Response**
```json
{
    "message": "Data updated successfully",
    "news_updated": {
        "id": 2,
        "category_id": 1,
        "users_id": 5,
        "title": "Judul berita 2 updated",
        "body": "Isi berita 2 updated",
        "created_at": "2024-10-29T07:08:42.315Z",
        "updated_at": "2024-10-30T05:49:58.390Z"
    }
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### POST `/news/search`
Endpoint ini digunakan untuk melakukan pencarian pada data news berdasarkan title
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. User yang mempunyai role Admin maupun role Visitor, dapat mengakses endpoint ini.
<br>

- **Request Headers role Admin**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Request Body**
```json
{
    "title" : "berita",
}
```

- **Response**
```json
[
    {
        "id": 1,
        "category_id": 1,
        "users_id": 5,
        "title": "Judul berita 1",
        "body": "Isi berita 1",
        "created_at": "2024-10-29T06:38:40.262Z",
        "updated_at": "2024-10-29T06:38:40.262Z"
    },
    {
        "id": 2,
        "category_id": 1,
        "users_id": 5,
        "title": "Judul berita 2 updated",
        "body": "Isi berita 2 updated",
        "created_at": "2024-10-29T07:08:42.315Z",
        "updated_at": "2024-10-30T05:53:58.366Z"
    },
    {
        "id": 5,
        "category_id": 4,
        "users_id": 5,
        "title": "Judul berita 5",
        "body": "Isi berita 5",
        "created_at": "2024-10-30T05:44:17.009Z",
        "updated_at": "2024-10-30T05:44:17.009Z"
    }
]
```
<br>
Jika user yang login mempunyai role visitor <br>
<br>

- **Request Header Role Visitor**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Request Body**
```json
{
    "title" : "berita",
}
```

- **Response**
```json
[
    {
        "id": 1,
        "category_id": 1,
        "users_id": 5,
        "title": "Judul berita 1",
        "body": "Isi berita 1",
        "created_at": "2024-10-29T06:38:40.262Z",
        "updated_at": "2024-10-29T06:38:40.262Z"
    },
    {
        "id": 2,
        "category_id": 1,
        "users_id": 5,
        "title": "Judul berita 2 updated",
        "body": "Isi berita 2 updated",
        "created_at": "2024-10-29T07:08:42.315Z",
        "updated_at": "2024-10-30T05:53:58.366Z"
    },
    {
        "id": 5,
        "category_id": 4,
        "users_id": 5,
        "title": "Judul berita 5",
        "body": "Isi berita 5",
        "created_at": "2024-10-30T05:44:17.009Z",
        "updated_at": "2024-10-30T05:44:17.009Z"
    }
]
```
<br>

### DELETE `/news/5`
Endpoint ini digunakan untuk menghapus data news berdasarkan id news tertentu
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. Jika user yang login mempunyai role Admin, maka user tersebut dapat mengakses endpoint ini.
<br>

- **Request Headers**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Response**
```json
{
    "message": "Data news has been deleted"
}
```
<br>
Jika user yang login mempunyai role visitor, maka endpoint akan mengembalikkan pesan error <br>
<br>

- **Request Header**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message": "Forbidden"
}
```
<br>

### Route Logout
### POST `/logout`
Endpoint ini digunakan user untuk logout 
### Pengujian
Pada endpoint ini, membutuhkan token untuk authorization user. Token authorization diletakkan di bagian headers dengan key Authorization. User yang mempunyai role Admin maupun role Visitor, dapat mengakses endpoint ini.
<br>

- **Request Headers role Admin**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE3MzAyODEyOTAsImV4cCI6MTczMDMxMDA5MH0.Tfmky7nWGBnSKywJY3B_WugbnljqR5vwaKaY4YPFVd4
```

- **Response**
```json
{
    "message" : "Logout Successfully"
}
```
<br>

Jika user yang login mempunyai role Visitor
- **Request Header Role Visitor**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MzAyODIxNDgsImV4cCI6MTczMDMxMDk0OH0.dd0V6_oHN7glqgNSDQ4YNTJVa11pEdNiKyDvXOTVldo
```

- **Response**
```json
{
    "message" : "Logout Successfully"
}
```
<br>

## Cara Memulai
1. Clone repository
```
git clone https://github.com/adhlira/API-portal-berita
```
<br>

2. Install Dependency
```
npm install
```
<br>

3. Setup Environment variables dengan membuat file .env, kemudian tambahkan beberapa variable berikut
```
DATABASE_URL="mysql://your_username@localhost:3306/your_databse"

BCRYPT_ROUND = 4
```
<br>

4. Run server
```
npm start
```
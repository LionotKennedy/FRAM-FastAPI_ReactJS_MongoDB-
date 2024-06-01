from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["myBlogs"]
blogsCollection = db["Users"]
comptesCollection = db["Comptes"]


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB !")
except Exception as e:
    print(e)    
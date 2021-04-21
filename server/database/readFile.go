package database

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"server/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/gridfs"
)

// Read file from database
func ReadFile(User string) (string, error) {
    var fileName string
    cur, err := collection.Find(
		context.Background(), 
		bson.M{"username": User})
	if err != nil {
		return fileName, err
	}
    var file models.User
	for cur.Next(context.Background()) {
		e := cur.Decode(&file)
		if e != nil {
			return fileName, e
		}
	}
    fileName = file.Image

	if err := cur.Err(); err != nil {
		return fileName, err
	}
	cur.Close(context.Background())
    // switching the database
    db := client.Database("myfiles")
    fsFiles := db.Collection("fs.files")
    // Finding the documents in fs.files
    ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
    var results bson.M
    e := fsFiles.FindOne(ctx, bson.M{}).Decode(&results)
    if e != nil {
        return fileName, e
    }
    // Initalizing GridFS
    bucket, _ := gridfs.NewBucket(
        db,
    )
    var buf bytes.Buffer
    // Downloading by param fileName
    dStream, err := bucket.DownloadToStreamByName(fileName, &buf)
    if err != nil {
        return fileName, err
    }
    fmt.Printf("File size to download: %v\n", dStream)
    ioutil.WriteFile(fileName, buf.Bytes(), 0600)
	return fileName, nil
}
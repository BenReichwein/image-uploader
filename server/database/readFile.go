package database

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/gridfs"
)

// Read file from database
func ReadFile(fileName string) (string, error) {
    // Initalizing the database
    db := client.Database("myfiles")
    fsFiles := db.Collection("fs.files")
    // Finding the documents in fs.files
    ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
    var results bson.M
    err := fsFiles.FindOne(ctx, bson.M{}).Decode(&results)
    if err != nil {
        return "", err
    }
    // print out the results
    fmt.Println(results)
    // Initalizing GridFS
    bucket, _ := gridfs.NewBucket(
        db,
    )
    var buf bytes.Buffer
    // Downloading by param fileName
    dStream, err := bucket.DownloadToStreamByName(fileName, &buf)
    if err != nil {
        return "", err
    }
    fmt.Printf("File size to download: %v\n", dStream)
    ioutil.WriteFile(fileName, buf.Bytes(), 0600)
	return fileName, nil
}
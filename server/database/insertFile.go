package database

import (
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo/gridfs"
)

// Uploads file to database
func InsertFile(data []byte, fileName string) {
    // Initalizing the gridFS
    bucket, err := gridfs.NewBucket(
        client.Database("myfiles"),
    )
    if err != nil {
        log.Fatal(err)
        os.Exit(1)
    }
    // Uploading the file name
    uploadStream, err := bucket.OpenUploadStream(
        fileName,
    )
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    defer uploadStream.Close()
    // Writes the file to the database
    fileSize, err := uploadStream.Write(data)
    if err != nil {
        log.Fatal(err)
        os.Exit(1)
    }
    // Everythings good here
    log.Printf("Write file to DB was successful. File size: %d M\n", fileSize)
}
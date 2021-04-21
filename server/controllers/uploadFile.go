package controllers

import (
	"log"
	"io/ioutil"
	"net/http"
	"server/database"
)

// Upload File
func UploadFile(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20) // limit your max input length!
    // Reads the file from the request
    file, header, err := r.FormFile("file")
    if err != nil {
        panic(err)
    }
    defer file.Close()

    // Reads the file and returns byte slice
    data, err := ioutil.ReadAll(file)
    if err != nil {
        log.Fatal(err)
    }
	// Inserts file to database
	database.InsertFile(data, header.Filename, "benny")
}
package controllers

import (
	"log"
	"net/http"
	"server/database"
)

// Download File
func DownloadFile(w http.ResponseWriter, r *http.Request) {
	
	fileName, err := database.ReadFile(Username)
	if err != nil {
        log.Fatal(err)
    }
	// Serving the file to frontend by filepath
    http.ServeFile(w, r, fileName)
}
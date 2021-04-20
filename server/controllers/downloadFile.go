package controllers

import (
	"log"
	"net/http"
	"server/database"

	"github.com/gorilla/mux"
)

// Download File
func DownloadFile(w http.ResponseWriter, r *http.Request) {
	// Get the params
    params := mux.Vars(r)

	fileName, err := database.ReadFile(params["fileName"])
	if err != nil {
        log.Fatal(err)
    }
	// Serving the file to frontend by filepath
    http.ServeFile(w, r, fileName)
}
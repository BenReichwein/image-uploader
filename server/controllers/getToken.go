package controllers

import (
	"fmt"
	"net/http"

	jwt "github.com/dgrijalva/jwt-go"
)

type Claims struct {
	Username string `json:"username"`
	Id       string `json:"id"`
	jwt.StandardClaims
}

var jwtKey = []byte("Uploader4224")
var Username string

// Checks if users token is ok
func GetToken(w http.ResponseWriter, r *http.Request) {
	c, err := r.Cookie("authToken")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get the JWT string from the cookie
	tknStr := c.Value

	// Initialize a new instance of `Claims`
	claims := &Claims{}

	// Parse the JWT string and store the result in `claims`.
	// Note that we are passing the key in this method as well. This method will return an error
	// if the token is invalid (if it has expired according to the expiry time we set on sign in),
	// or if the signature does not match
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		fmt.Println(err, "probably because you don't have your secrets the same")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Finally, return the welcome message to the user, along with their
	// username given in the token
	Username = claims.Username
	w.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Username)))
}
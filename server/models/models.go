package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username  string             `json:"username"`
	Password  string             `json:"password"`
	Token     string             `json:"token"`
}

type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}
package main

import (
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"regexp"
	"time"
)

func main() {
	url := "https://free-proxy-list.net/"

	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	r := regexp.MustCompile(`<tr><td>(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})</td><td>(\d+)</td>`)
	matches := r.FindAllStringSubmatch(string(body), -1)

	rand.Seed(time.Now().UnixNano())
	randomIndex := rand.Intn(len(matches))

	fmt.Printf("Random proxy: %s:%s\n", matches[randomIndex][1], matches[randomIndex][2])
}

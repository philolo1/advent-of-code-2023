package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	fileName := os.Args[1]
	fmt.Printf("%v\n", fileName)
	file, err := os.Open(fileName)
	if err != nil {
		// Handle any errors opening the file
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close() // Ensure the file is closed when we're done

	// Create a scanner to read the file
	scanner := bufio.NewScanner(file)

	var sum int64
	sum = 0

	// Read line by line
	for scanner.Scan() {
		line := scanner.Text()
		fmt.Println(line) // Process the line
		arr := strings.Split(line, "")
		// fmt.Println(arr) // Process the line

		numArr := make([]string, 0)

		for index, value := range arr {
			// fmt.Println(index, value)
			if strings.Contains("0123456789", value) {
				numArr = append(numArr, value)
			} else {
				numbers := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}

				for nIndex, num := range numbers {
					if index+len(num) <= len(line) && num == line[index:index+len(num)] {
						numArr = append(numArr, strconv.Itoa(nIndex+1))
					}
				}

			}
		}

		// fmt.Printf("%v\n", numArr)
		res, err := strconv.ParseInt(numArr[0]+numArr[len(numArr)-1], 10, 64)

		if err == nil {
			sum += res
		}
		fmt.Printf("%v\n", res)

	}

	fmt.Printf("Sum: %v\n", sum)
	// Check for any errors encountered while reading
	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading from file:", err)
	}
}

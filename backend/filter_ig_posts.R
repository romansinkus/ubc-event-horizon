# Load the necessary library
library(readr)

setwd("C:/Users/Paul Tiberghien/Desktop/LIFE/dev stuff/NWHacks2024/ubc-event-horizon/data")
# Read the CSV file
ig_posts <- read_csv("ig_posts_descriptions.csv")

# Keep only the 'postURL' and 'description' columns
ig_posts_selected <- ig_posts[, c("postUrl", "description")]

# You can view the first few rows of the filtered data
print(head(ig_posts_selected))

# Optionally, save the filtered data to a new CSV file
write_csv(ig_posts_selected, "C:/Users/Paul Tiberghien/Desktop/LIFE/dev stuff/NWHacks2024/ubc-event-horizon/backend/filtered_ig_posts.csv")

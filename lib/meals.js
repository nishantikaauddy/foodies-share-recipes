// To work with the file system
import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db"); // Creating a connection to this db

export function fetchMeals() {
  // prepare is to create an sql statement, all is fetch all data rows returned
  return db.prepare("SELECT * FROM meals").all();

  // .get() is to fetch the first row
  // .run() is used when we want to update data
}

export function fetchMealDetails(slug) {
  // The ? is to dynamically set slug value and to avoid sql injections
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // To store the image in the public folder as storing it in DB is bad practice
  const imageExtension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${imageExtension}`;

  // To create a write stream
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      // throw error
    }
  });

  // Change the meal image path as by default images will be picked from the public folder
  meal.image = `/images/${fileName}`;

  // To save
  db.prepare(
    `
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
  ).run(meal);
}

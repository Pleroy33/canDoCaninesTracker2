const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const userId = req.user.id; // Get the current user's ID

  let sqlText = `
  SELECT
  d."id" AS "dog_id",
  d."dog_name",
  d."age",
  b."breed" AS "breed_name",
  ft."food_type" AS "food_type_name",
  ee."exercise_equipment" AS "exercise_equipment_name",
  ih."condition" AS "in_heat_condition",
  beh."behavior_category_name" AS "behavior_with_other_dogs",
  beh_cats."behavior_category_name" AS "behavior_with_cats",
  beh_children."behavior_category_name" AS "behavior_with_children",
  hr."id" AS "hosting_request_id",
  hr."start_date",
  hr."end_date",
  hr."date_comments",
  hr."appointments",
  hr."status" AS "hosting_status",
  vh."id" AS "volunteer_hosting_id",
  vh."start_date" AS "volunteer_start_date",
  vh."end_date" AS "volunteer_end_date",
  vh."comments" AS "volunteer_comments",
  vh."status" AS "volunteer_status"
FROM
  "dogs" d
JOIN
  "breed" b ON d."breed" = b."id"
JOIN
  "food_type" ft ON d."food_type" = ft."id"
JOIN
  "exercise_equipment" ee ON d."exercise_equipment" = ee."id"
JOIN
  "in_heat" ih ON d."in_heat" = ih."id"
JOIN
  "behavior" beh ON d."behavior_with_other_dogs" = beh."id"
JOIN
  "behavior" beh_cats ON d."behavior_with_cats" = beh_cats."id"
JOIN
  "behavior" beh_children ON d."behavior_with_children" = beh_children."id"
LEFT JOIN
  "hosting_request" hr ON d."id" = hr."dog_id"
LEFT JOIN
  "volunteer_hosting" vh ON hr."id" = vh."request_id"
WHERE
  d."user_id" = $1;

`;

  const sqlParams = [userId]; // Use the current user's ID as the parameter for the query

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(
        "Error fetching user's dogs with SQL:",
        sqlText,
        "Parameters:",
        sqlParams,
        "Error:",
        error
      );
      res.sendStatus(500); // Send a server error status code
    });
});

router.get("/:id", (req, res) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated() || !req.user) {
    return res.sendStatus(401);
  }

  const userId = req.user.id; // Get the current user's ID
  const dogId = req.params.id; // Extract the dog ID from the route parameter

  let sqlText = `
  SELECT
  "dogs"."user_id",
  "dogs"."id" AS "dog_id",
  "dogs"."dog_name",
  "dogs"."age",
  "dogs"."breed",
  "dogs"."spayed_neutered",
  "dogs"."food_type",
  "dogs"."food_amount",
  "dogs"."meals_per_day",
  "dogs"."eating_times",
  "dogs"."medical_conditions",
  "dogs"."recovering_from_surgery",
  "dogs"."medications",
  "dogs"."in_heat",
  "dogs"."potty_routine",
  "dogs"."potty_habits_notes",
  "exercise_equipment"."exercise_equipment",
  "dogs"."crate_manners",
  "dogs"."house_manners",
  "dogs"."living_with_other_dogs",
  "dogs"."living_with_cats",
  "dogs"."living_with_children_older_ten",
  "dogs"."living_with_children_younger_ten",
  "dogs"."living_with_adults",
  "dogs"."living_with_small_animals",
  "dogs"."living_with_large_animals",
  "behavior_dog"."behavior_category_name" AS "behavior_with_other_dogs",
  "behavior_cat"."behavior_category_name" AS "behavior_with_cats",
  "behavior_child"."behavior_category_name" AS "behavior_with_children",
  "dog_hosting"."id" AS "hosting_id",
  "dog_hosting"."start_date",
  "dog_hosting"."end_date",
  "dog_hosting"."date_comments",
  "dog_hosting"."appointments",
  "dog_hosting"."status"
FROM
  "user"
JOIN
  "dogs" ON "user"."id" = "dogs"."user_id"
JOIN
  "exercise_equipment" ON "dogs"."exercise_equipment" = "exercise_equipment"."id"
JOIN
  "behavior" AS "behavior_dog" ON "dogs"."behavior_with_other_dogs" = "behavior_dog"."id"
JOIN
  "behavior" AS "behavior_cat" ON "dogs"."behavior_with_cats" = "behavior_cat"."id"
JOIN
  "behavior" AS "behavior_child" ON "dogs"."behavior_with_children" = "behavior_child"."id"
JOIN
  "dog_hosting" ON "dogs"."id" = "dog_hosting"."dog_id"
WHERE
  "dogs"."user_id" = $1 AND "dogs"."id" = $2;
  `;

  const sqlParams = [userId, dogId]; // Use the current user's ID and the dog ID as parameters for the query

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(
        "Error fetching user's dog with SQL:",
        sqlText,
        "Parameters:",
        sqlParams,
        "Error:",
        error
      );
      res.sendStatus(500); // Send a server error status code
    });
});

module.exports = router;

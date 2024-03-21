import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  AppBar,
  IconButton,
  Box,
  Paper,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from "sweetalert";

function DogProfile() {

  let history = useHistory();
  let dispatch = useDispatch();

  const dogProfile = useSelector((state) => state.fetchOneDogProfile);
  console.log("dogProfile", dogProfile)
  const { dogId } = useParams();
  console.log("dogId front end", dogId)

  useEffect(() => {
    if (dogId) {
      dispatch({ type: "FETCH_ONE_DOG_PROFILE", payload: { dogId } });
    }
  }, [dogId, dispatch]);


  // // Confirm deletion and call onDelete
  const handleDelete = async (event) => {
    event.preventDefault();
    console.log("delete dog id:", dogId)
    try {
      const value = await swal({
        title: "Are you sure?",
        text: "Select your action for this profile",
        icon: "warning",
        buttons: {
          cancel: "Go Back",
          delete: {
            text: "Permanently Delete",
            value: "delete",
          },
        },
        dangerMode: true,
      });
      if (value === "delete") {
        await axios.delete(`/api/dog/${dogId}`);
        console.log("Deleted", dogId);
        await swal("Deleted!", "The dog profile has been permanently deleted.", "success");
        dispatch({ type: "REMOVE_DOG_PROFILE", dogId });
        history.push('/');
      } else {
        // The user clicked on "Go Back" or clicked outside the alert, no action needed
        swal("Cancelled", "No changes were made to the dog's profile.", "info");
      }
    } catch (error) {
      console.error("An error occurred while processing the profile:", error);
      swal("Error", "An error occurred while processing the profile.", "error");
    }
  };


  // Navigate to Edit Dog Profile
  const handleEdit = () => {
    console.log("handle edit clicked for:", dogId);
    dispatch({ type: 'SET_EDIT_DOG', payload: dogProfile })
    history.push(`/editdogprofile/${dogId}`)
  };

  // Navigate to Request Care Dates
  const handleRequestCareDates = () => {
    console.log("button for request care dates was pushed for dog Id:", dogId);
    history.push(`/requestcareform/${dogId}`)

  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">

      </AppBar>
      <Card sx={{ mt: 12 }}>
        <CardContent>
          {/* <IconButton onClick={onGoBack}>
            <ArrowBackIcon />
          </IconButton> */}
          <Typography gutterBottom variant="h5" component="div">
            {dogProfile?.dog_name}’s Profile
          </Typography>
          <CardMedia
            component="img"
            height="500"
            image="/public/images/dogoutline.jpeg"
            alt="Dog"
          />
        </CardContent>
      </Card>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
          <Paper>
          <Typography variant="h6">Basic Information</Typography>

            <Typography variant="body1">Name: {dogProfile?.dog_name}</Typography>
            <Typography variant="body1">Age: {dogProfile?.age}</Typography>
            <Typography variant="body1">Breed: {dogProfile?.breed}</Typography>
            <Typography variant="body1">Spayed or Neutered: {dogProfile?.spayed_neutered ? 'Yes' : 'No'}</Typography>
          </Paper>
          </Grid>
          <Grid item xs={6}>

          <Paper>
          <Typography variant="h6">Meals</Typography>

            <Typography variant="body1">Food: {dogProfile?.food_type}</Typography> {/* You may need to adjust this if food_type is supposed to display a string rather than a numeric ID */}
            <Typography variant="body1">Amount of Food at Meal Time: {dogProfile?.food_amount}</Typography>
            <Typography variant="body1">Number of Meals a day: {dogProfile?.meals_per_day}</Typography>
            <Typography variant="body1">Meal Times: {dogProfile?.eating_times}</Typography>
          </Paper>
          </Grid>

          <Grid item xs={6}>
          <Paper>
          <Typography variant="h6">Medical Information</Typography>

            <Typography variant="body1">Medical Concerns: {dogProfile?.medical_conditions}</Typography>
            <Typography variant="body1">Recent Surgery: {dogProfile?.recovering_from_surgery ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1">Medications: {dogProfile?.medications}</Typography>
            <Typography variant="body1">If female: In Heat? {dogProfile?.in_heat}</Typography>
          </Paper>
          </Grid>

          <Grid item xs={6}>
          <Paper>
          <Typography variant="h6">Potty Habits </Typography>

            <Typography variant="body1">Potty Routine: {dogProfile?.potty_routine}</Typography>
            <Typography variant="body1">Notes about potty habits: {dogProfile?.potty_habits_notes}</Typography> {/* Note the correction from potty_habit_notes to potty_habits_notes */}
          </Paper>
          </Grid>

          <Grid item xs={6}>

          <Paper>
          <Typography variant="h6">Excercise Routine</Typography>

            <Typography variant="body1">Limit Water: {dogProfile?.limit_water ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1">Limit Toy Play: {dogProfile?.limit_toy_play ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1">May Destroy Toys: {dogProfile?.watch_carefully ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1">May Ingest Toys: {dogProfile?.ingest_toys ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1">May Play Keep Away: {dogProfile?.keep_away ? 'Yes' : 'No'}</Typography>
            <Typography variant="body1">Shares Toys: {dogProfile?.shares_toys ? 'Yes' : 'No'}</Typography>




            <Typography variant="body1">Exercise Equipment: {dogProfile?.exercise_equipment}</Typography>
          </Paper>
          </Grid>
          

          <Grid item xs={6}>
            <Paper>
          <Typography variant="h6">Behavorial Information</Typography>
          <Typography variant="body1">Lives with other dogs? {dogProfile?.living_with_other_dogs ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Lives with cats? {dogProfile?.living_with_cats ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Lives with children older than 10? {dogProfile?.living_with_children_10_and_up ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Lives with children younger than 10? {dogProfile?.living_with_children_younger_ten ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Lives with adults? {dogProfile?.living_with_adults ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Lives with other small animals? {dogProfile?.living_with_small_animals ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Lives with other large animals? {dogProfile?.living_with_large_animals ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Behavior with other dogs: {dogProfile?.behavior_with_other_dogs}</Typography>
          <Typography variant="body1">Behavior with cats: {dogProfile?.behavior_with_cats}</Typography>
          <Typography variant="body1">Behavior with children: {dogProfile?.behavior_with_children}</Typography>
          </Paper>
          </Grid>

          <Grid item xs={12}>

          <Paper>
          <Typography variant="h6">Crating and House Manners</Typography>

            <Typography variant="body1">Crate Manners: {dogProfile?.crate_manners}</Typography>
            <Typography variant="body1">House Manners: {dogProfile?.house_manners}</Typography>
          </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Profile
        </Button>
        <Button variant="outlined" onClick={handleEdit} sx={{ mx: 1 }}>
          Edit Profile
        </Button>
        <Button variant="contained" color="primary" onClick={handleRequestCareDates}>
          Request Care Dates
        </Button>
      </Box>
    </Container>
  );
};

export default DogProfile;


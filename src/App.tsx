import React, { useState, ChangeEvent, useEffect } from "react";
import "./App.css";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Button,
  Slider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import AdjustmentAxis from "./components/AdjustmentAxis";
import dimensions from "./dimensions.json";

function App() {
  const [lastContact, setLastContact] = useState(5);
  const [friendName, setFriendName] = useState("");
  const [reason, setReason] = useState("");
  const [friendshipLevel, setFriendshipLevel] = useState(3);
  const [reasonGiven, setReasonGiven] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [adjustmentVector, setAdjustmentVector] = useState<(boolean | null)[]>(
    dimensions.map((axis) => null)
  );
  const [adjustmentPrompt, setAdjustmentPrompt] = useState("");
  const [canAdjust, setCanAdjust] = useState(false);

  const intervals = [
    "yesterday",
    "3 days ago",
    "1 week ago",
    "2 weeks ago",
    "1 month ago",
    "3 months ago",
    "6 months ago",
    "1 year ago",
    "2 years ago",
    "5 years ago",
    "10 years ago",
  ];

  const friendshipLevels = [
    "BFF 👯",
    "Close Friend 👫",
    "Friend 😊",
    "Casual Friend 🥂",
    "Colleague 💼",
    "Acquaintance 👋",
    "Distant Acquaintance 🤷",
  ];

  const handleFriendNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFriendName(event.target.value);
  };

  const handleReasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const handleGeneratePrompt = () => {
    let message = `Please generate a message to reconnect with ${friendName}. The relationship between this person and me is ${friendshipLevels[
      friendshipLevel
    ].slice(0, -2)}, so please match the tone. The last time we talked was ${
      intervals[lastContact]
    }. This should be considered when writing the message. \n`;

    if (reasonGiven && reason.length > 0) {
      message = message + "Also, there is a reason I contact them: " + reason;
    }
    setPrompt(message);
  };

  const handleGenerateMessage = () => {
    //ToDo1: send prompt to openai and set Result as message
    //ṕrompt is stored in the prompt variable
    setMessage("Openai Pls");
  };

  const handleAdjust = () => {
    //ToDo2: send adjustment prompt together with message to openai
    // set result as message with setMessage()
    // adjustment prompt is stored in adjustmentPromptVariable
    // message is stored in message variable
  
    //Reset AdjustmentVector afterwards
    setAdjustmentVector(dimensions.map((axis) => null));
  }

  useEffect(() => {
    console.log("rerender triggered")
    let axisStatements = adjustmentVector.map((value, index) => {
      if (value == true) {
        return dimensions[index].more.description;
      } else if (value == false) {
        return dimensions[index].less.description;
      } else {
        return "";
      }
    });
    let newAdjustmentPrompt = axisStatements.join(" ");
    setAdjustmentPrompt(newAdjustmentPrompt);
    console.log(newAdjustmentPrompt)
  }, [adjustmentVector]);

  useEffect(() => {
    setCanAdjust(adjustmentVector.filter((value)=>{return value != null}).length > 0);
  }, [adjustmentPrompt]);

  

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center">
      <Stack
        direction="column"
        alignItems="center"
        sx={{ width: "50vw", marginBlock: "2vh", justifyContent: "space-between" }}
      >
        <Typography variant="h4">Reconnect with your friends!</Typography>
        <Typography variant="h6" sx={{ marginTop: "1em" }}>
          What is your friends name?
        </Typography>
        <TextField label="Name" value={friendName} onChange={handleFriendNameChange}></TextField>
        <Typography variant="h6" sx={{ marginTop: "1em" }}>
          How long since you last talked?
        </Typography>
        <Slider
          aria-label="Interval"
          value={lastContact}
          onChange={(e, newValue: number | number[]) => setLastContact(newValue as number)}
          valueLabelDisplay="on"
          step={1}
          marks={intervals.map((interval, index) => ({ value: index, label: "" }))}
          valueLabelFormat={(value) => intervals[value]}
          min={0}
          max={10}
          sx={{ width: "20vw", marginTop: "3em" }}
        />
        <Typography variant="h6" sx={{ marginTop: "1em" }}>
          How close are you in terms of relationship?
        </Typography>
        <Slider
          aria-label="Friendship Level"
          value={friendshipLevel}
          onChange={(e, newValue: number | number[]) => setFriendshipLevel(newValue as number)}
          valueLabelDisplay="on"
          step={1}
          marks={friendshipLevels.map((_, index) => ({ value: index, label: "" }))}
          valueLabelFormat={(value) => friendshipLevels[value]}
          min={0}
          max={6}
          sx={{ width: "20vw", marginTop: "3em" }}
        />
        <Typography variant="h6" sx={{ marginTop: "1em" }}>
          Is there a reason you want to contact them?
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={reasonGiven} onChange={() => setReasonGiven(!reasonGiven)} />
            }
            label="Yes"
          />
        </FormGroup>
        <TextField
          label="Reason"
          value={reason}
          onChange={handleReasonChange}
          sx={{ width: "30vw", display: reasonGiven ? "flex" : "none" }}
        ></TextField>
        <Button
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={handleGeneratePrompt}
          disabled={friendName.length == 0 || (reasonGiven && reason.length == 0)}
        >
          Generate Prompt
        </Button>
        <TextField
          multiline
          value={prompt}
          sx={{ width: "30vw", marginTop: "20px", marginBottom: "20px" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPrompt(event.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={handleGenerateMessage}
          disabled={prompt == ""}
        >
          Generate Message
        </Button>
        <TextField
          multiline
          value={message}
          sx={{ width: "30vw", marginTop: "20px", marginBottom: "20px" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(event.target.value);
          }}
        ></TextField>
         <Typography variant="h6" sx={{ marginBlock: "1em" }}>
          Doesn't sound like you? 
        </Typography>
        <Button variant="contained" disabled={!canAdjust || message.length == 0} onClick={handleAdjust}>
          Adjust
        </Button>
        {dimensions.map((dim, index) => (
          <AdjustmentAxis
            stament={dim.statement}
            less={dim.less.label}
            more={dim.more.label}
            axisValue={adjustmentVector[index]}
            setAxisValue={(newValue: boolean | null) => {
              let newAdjustmentVector = [...adjustmentVector];
              newAdjustmentVector[index] = newValue;
              setAdjustmentVector(newAdjustmentVector);

      
            }}
            disabled={
              message.length == 0
            }
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default App;

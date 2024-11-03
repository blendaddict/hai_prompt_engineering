import { Button, Paper, Stack, Typography } from "@mui/material";

interface AdjustmentProps {
  stament: string;
  less: string;
  more: string;
  axisValue: boolean|null;
  setAxisValue: (newValue:boolean|null)=>void;
  disabled: boolean;
}



export default function AdjustmentAxis(props: AdjustmentProps) {

  return (
    <Paper sx={{ margin: "1vw", width: "50vw", height: "4em" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        sx={{ height: "100%" }}
      >
        <Button variant={props.axisValue==false ? "contained": "outlined"} sx={{ width: "5vw", height: "3.5em" }} disabled={props.disabled} onClick={()=>{
            props.axisValue == false ? props.setAxisValue(null): props.setAxisValue(false);
        }}>
          <Typography variant="subtitle2" fontSize={11}>
            {props.less}
          </Typography>
        </Button>

        <Stack justifyContent={"center"} alignItems={"center"} sx={{ width: "30vw" }}>
          <Typography variant="subtitle1">{props.stament}</Typography>
        </Stack>

        <Button variant={props.axisValue==true ? "contained": "outlined"} sx={{ width: "6vw", height: "3.5em" }} disabled={props.disabled} onClick={()=>{
            props.axisValue == true ? props.setAxisValue(null): props.setAxisValue(true);
        }}>
          {" "}
          <Typography variant="subtitle1" fontSize={11}>
            {props.more}
          </Typography>
        </Button>
      </Stack>
    </Paper>
  );
}

import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import axios from "axios";

const ScheduleSwitch = ({ setOn, on, view }) => {
  return (
    <FormControl mb={5} display='flex' alignItems='center'>
      <FormLabel htmlFor='email-alerts' mb='0'>
        {`Enable ${view} auto-changing`}{" "}
      </FormLabel>
      <Switch
        isChecked={on}
        onChange={(e) => {
          e.target.checked ? setOn(true) : setOn(false);
          axios.post("/api/settings", {
            value: e.target.checked,
            type: `${view}`,
          });
        }}
        id='email-alerts'
      />
    </FormControl>
  );
};

export default ScheduleSwitch;

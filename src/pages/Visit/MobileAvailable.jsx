import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ServiceList, VisitCard } from '../../components';
import paths from '../../constants/paths';

const MobileAvailable = ({ visit, handleAccept, isMatching }) => {
  const [covid1, setCovid1] = useState('');
  const [covid2, setCovid2] = useState('');
  const [covid3, setCovid3] = useState('');

  return (
    <>
      <Box flexGrow={1}>
        <Box p={2}>
          <ServiceList services={visit.services} />
          <Box py={2} />
          <VisitCard client={visit.client} notes={visit.notes} />
        </Box>
      </Box>
      <Box p={2}>
        <Typography variant="h2" gutterBottom>
          COVID-19 Screening
        </Typography>
        <Typography gutterBottom>
          <b>
            1. Have you had any of the following new or worsening symptoms or
            signs?
          </b>
        </Typography>
        <Typography>- Fever or chills</Typography>
        <Typography>- Difficulty breathing or shortness of breath</Typography>
        <Typography>- Cough</Typography>
        <Typography>- Sore throat, trouble swallowing</Typography>
        <Typography>- Runny nose/stuffy nose or nasal congestion</Typography>
        <Typography>- Decrease or loss of smell or taste</Typography>
        <Typography>- Nausea, vomiting, diarrhea, abdominal pain</Typography>
        <Typography gutterBottom>
          - Not feeling well, extreme tiredness, sore muscles
        </Typography>
        <Typography gutterBottom>
          <i>
            Symptoms should not be chronic or related to other known causes or
            conditions.
          </i>
        </Typography>

        <RadioGroup
          row
          value={covid1}
          onChange={(e) => setCovid1(e.target.value)}
        >
          <FormControlLabel
            value="yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>

        <Typography gutterBottom>
          <b>2. Have you travelled outside of Canada in the past 14 days?</b>
        </Typography>

        <RadioGroup
          row
          value={covid2}
          onChange={(e) => setCovid2(e.target.value)}
        >
          <FormControlLabel
            value="yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>

        <Typography gutterBottom>
          <b>
            3. Have you had close contact with a confirmed or probable case of
            COVID-19?
          </b>
        </Typography>

        <RadioGroup
          row
          value={covid3}
          onChange={(e) => setCovid3(e.target.value)}
        >
          <FormControlLabel
            value="yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
      </Box>
      <Box p={2}>
        <Button
          onClick={handleAccept}
          disabled={
            isMatching || covid1 !== 'no' || covid2 !== 'no' || covid3 !== 'no'
          }
          fullWidth
          variant="contained"
          color="primary"
        >
          Accept Job
        </Button>
        <Button
          component={Link}
          fullWidth
          to={paths.visitsIncoming}
          disabled={isMatching}
        >
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default MobileAvailable;

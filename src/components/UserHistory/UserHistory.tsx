import React from 'react';
import Typography from "@mui/material/Typography";
import {IProductInfo, IUsers} from "../../models/Interfaces";
import UserHistoryItem from "../UserHistoryItem/UserHistoryItem";
import "./UserHistory.scss"
import {styled} from "@mui/material/styles";
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion";
import MuiAccordionSummary, {AccordionSummaryProps} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />))(({theme}) =>
  ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}{...props}
  />))

(({theme}) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface IUserHistoryProps {
  user: IUsers
}

const UserHistory : React.FC<IUserHistoryProps> =  ({user}) => {

  const [expanded, setExpanded] = React.useState<string | false>('panel');
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <section className='userHistory'>
      {user?.history && Object.entries(user?.history)?.map(([k, value], i) =>
        <Accordion key={i} expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>
          <AccordionSummary aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
            <Typography>
              {k.replace(' GMT+0300 (Москва, стандартное время)', '')}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className='userHistory__productList'>
              {value.map((elem: IProductInfo) =>
                <UserHistoryItem product={elem} key={elem.id}/>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </section>
  );
};

export default UserHistory;
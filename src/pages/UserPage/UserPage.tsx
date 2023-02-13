import React, {useEffect} from 'react';
import './UserPage.scss'
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom"
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {IHistoryProduct} from "../../models/Interfaces";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import './UserPage.scss'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />))(({theme}) =>
  ({ // const [addNewUser, {isError}] = useAddUserMutation();

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

const UserPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const [expanded, setExpanded] = React.useState<string | false>('panel');

  useEffect(() => {
    !user.name && navigate('/')
  }, [user])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <main className='userPage'>
      <h2 className='userPage__title'> Hello, {user.name}!</h2>

      <div className='userPage__accordion'>
        {Object.keys(user.history).map((k, i) => {
          return (
            <Accordion key={i} expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>
              <AccordionSummary aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
                <Typography>
                  {k.replace(' GMT+0300 (Москва, стандартное время)', '')}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div className='userPage__productList'>
                  {user.history[String(k)].map((elem: IHistoryProduct) =>
                    <HistoryItem product={elem} key={elem.id} />
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>


      <section className='userPage__info'>

      </section>

    </main>
  );
};

export default UserPage;
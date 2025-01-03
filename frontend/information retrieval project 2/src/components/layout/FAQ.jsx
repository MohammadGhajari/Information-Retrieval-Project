import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "var(--color-white-1)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function FAQ() {
  const [expanded, setExpanded] = React.useState("panel0");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const QAPairs = [
    {
      q: "What is SEO, and why is it important?",
      a: "SEO stands for Search Engine Optimization. It helps your website rank higher in search engine results, driving more organic traffic and improving your online visibility.",
    },
    {
      q: "How does your platform help with website ranking?",
      a: "Our platform analyzes key SEO metrics like keywords, backlinks, page load speed, and domain authority to provide actionable insights for improving your ranking.",
    },
    {
      q: "Do I need any technical knowledge to use this platform?",
      a: "Not at all! Our platform is user-friendly, and you can easily follow our suggestions without any prior technical knowledge.",
    },
    {
      q: "How accurate are your website ranking statistics?",
      a: "We use advanced algorithms and data from trusted sources to ensure our analytics are accurate and up-to-date.",
    },
    {
      q: "Can I track multiple websites?",
      a: "Yes, our platform allows you to track and analyze multiple websites within your account.",
    },
    {
      q: "What metrics can I analyze with this platform?",
      a: "You can analyze metrics such as keyword rankings, organic traffic, backlinks, domain authority, and site health.",
    },
    {
      q: "Can I download the reports?",
      a: "Yes, you can export your reports in PDF or CSV format for offline access and sharing.",
    },
    {
      q: "How often is the data updated?",
      a: "Our platform updates your website’s metrics daily to provide the most accurate insights.",
    },
    {
      q: "Do you offer keyword suggestions?",
      a: "Yes, our platform provides keyword suggestions based on your niche and competitors’ performance.",
    },
    {
      q: "Can I see my competitors' rankings?",
      a: "Yes, our competitor analysis feature allows you to compare your website’s ranking with your competitors’.",
    },
  ];

  return (
    <div
      id="faq"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
        alignItems: "center",
        color: "var(--color-grey-3)",
      }}
    >
      <h1 style={{ fontSize: "4rem" }}>FAQs</h1>

      <div style={{ boxShadow: "var(--shadow-sm)" }}>
        {QAPairs.map((qa, i) => (
          <Accordion
            key={i}
            expanded={expanded === `panel${i + 1}`}
            onChange={handleChange(`panel${i + 1}`)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography color="var(--color-grey-3)" component="span">
                {qa.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "var(--color-white-1)" }}
            >
              <Typography color="var(--color-grey-3)">{qa.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

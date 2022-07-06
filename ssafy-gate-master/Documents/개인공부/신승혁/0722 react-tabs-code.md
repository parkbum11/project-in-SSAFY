```javascript
import React from "react";
import { Tabs, Tab, Typography, Box, AppBar } from "@material-ui/core";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PropTypes from "prop-types";

// https://material-ui.com/components/tabs/
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabTest = () => {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} defaultIndex={1}>
          <Tab label="서울" {...a11yProps(0)} />
          <Tab label="대전" {...a11yProps(1)} />
          <Tab label="구미" {...a11yProps(2)} />
          <Tab label="광주" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <AppBar position="static">
          <Tabs value={value2} onChange={handleChange2} forceRenderTabPanel>
            <Tab label="1반" {...a11yProps(0)} />
            <Tab label="2반" {...a11yProps(1)} />
            <Tab label="3반" {...a11yProps(2)} />
            <Tab label="4반" {...a11yProps(3)} />
            <Tab label="5반" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value2} index={0}>
          <p>Husband of Marge; father of Bart, Lisa, and Maggie.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Homer_Simpson_2006.png/212px-Homer_Simpson_2006.png"
            alt="Homer Simpson"
          />
        </TabPanel>
        <TabPanel value={value2} index={1}>
          <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png"
            alt="Marge Simpson"
          />
        </TabPanel>
        <TabPanel value={value2} index={2}>
          <p>
            Oldest child and only son of Homer and Marge; brother of Lisa and
            Maggie.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png"
            alt="Bart Simpson"
          />
        </TabPanel>
        <TabPanel value={value2} index={3}>
          <p>
            Middle child and eldest daughter of Homer and Marge; sister of Bart
            and Maggie.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Lisa_Simpson.png/200px-Lisa_Simpson.png"
            alt="Lisa Simpson"
          />
        </TabPanel>
        <TabPanel value={value2} index={4}>
          <p>
            Youngest child and daughter of Homer and Marge; sister of Bart and
            Lisa.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Maggie_Simpson.png/223px-Maggie_Simpson.png"
            alt="Maggie Simpson"
          />
        </TabPanel>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <AppBar position="static">
          <Tabs value={value2} onChange={handleChange2} forceRenderTabPanel>
            <Tab label="1반" {...a11yProps(0)} />
            <Tab label="2반" {...a11yProps(1)} />
            <Tab label="3반" {...a11yProps(2)} />
            <Tab label="4반" {...a11yProps(3)} />
            <Tab label="5반" {...a11yProps(4)} />
            <Tab label="6반" {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value2} index={0}>
          <p>
            Protagonist, from the 20th Century. Delivery boy. Many times
            great-uncle to Professor Hubert Farnsworth. Suitor of Leela.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Philip_Fry.png/175px-Philip_Fry.png"
            alt="Philip J. Fry"
          />
        </TabPanel>
        <TabPanel value={value2} index={1}>
          <p>
            Mutant cyclops. Captain of the Planet Express Ship. Love interest of
            Fry.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Turanga_Leela.png/150px-Turanga_Leela.png"
            alt="Turanga Leela"
          />
        </TabPanel>
        <TabPanel value={value2} index={2}>
          <p>
            A kleptomaniacal, lazy, cigar-smoking, heavy-drinking robot who is
            Fry's best friend. Built in Tijuana, Mexico, he is the Planet
            Express Ship's cook.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Bender_Rodriguez.png/220px-Bender_Rodriguez.png"
            alt="Bender Bending Rodriguez"
          />
        </TabPanel>
        <TabPanel value={value2} index={3}>
          <p>
            Chinese-Martian intern at Planet Express. Fonfon Ru of Kif Kroker.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/FuturamaAmyWong.png/140px-FuturamaAmyWong.png"
            alt="Amy Wong"
          />
        </TabPanel>
        <TabPanel value={value2} index={3}>
          <p>
            Many times great-nephew of Fry. CEO and owner of Planet Express
            delivery company. Tenured professor of Mars University.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FuturamaProfessorFarnsworth.png/175px-FuturamaProfessorFarnsworth.png"
            alt="Professor Hubert J. Farnsworth"
          />
        </TabPanel>
        <TabPanel value={value2} index={4}>
          <p>
            Alien from Decapod 10. Planet Express' staff doctor and steward. Has
            a medical degree and Ph.D in art history.
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Dr_John_Zoidberg.png/200px-Dr_John_Zoidberg.png"
            alt="Doctor John Zoidberg"
          />
        </TabPanel>
      </TabPanel>

      <TabPanel value={value} index={2}>
        {" "}
        This is 구미
      </TabPanel>
      <TabPanel value={value} index={3}>
        {" "}
        광 주{" "}
      </TabPanel>
    </div>
  );
};
export default TabTest;
```

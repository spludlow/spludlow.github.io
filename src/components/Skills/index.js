import { Grid, Paper, Stack, Typography } from "@mui/material";

import "./skills.scss";

import ReactLogo from './react.png';
import JavaScriptLogo from './javascript.png';
import TypeScriptLogo from './typescript.png';
import ReduxLogo from './redux.png';
import HTMLLogo from './html5.png';
import CSS3Logo from './css3.png';
import SassLogo from './scss.png';
import GitLogo from './git.png';
import FigmaLogo from './figma.png';

function Skills() {

    const skillList = [
        { name: 'React', image: ReactLogo },
        { name: 'JavaScript', image: JavaScriptLogo },
        { name: 'TypeScript', image: TypeScriptLogo },
        { name: 'Redux', image: ReduxLogo },
        { name: 'HTML', image: HTMLLogo },
        { name: 'CSS3', image: CSS3Logo },
        { name: 'Sass', image: SassLogo },
        { name: 'Git', image: GitLogo },
        { name: 'Figma', image: FigmaLogo },
    ];

    const renderSkill = (skill, index) => (
        <Grid item key={skill.name + index}>
            <Stack spacing={2} alignItems="center">
                <img class="skillLogo" src={skill.image} alt={skill.name} width="75" height="75" />
                <Typography>
                    <code>{skill.name}</code>
                </Typography>
            </Stack>
        </Grid>
    )

    return (
        <Grid container justifyContent="center" id="Skills">
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
                        <code>Skills</code>
                    </Typography>
                    <Grid container spacing={8} justifyContent="center">
                        {skillList.map(renderSkill)}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>);
}

export default Skills;
"use client"
import React from 'react';
import { Grid, Box } from "@mui/material";
import ProgressCard from "@/components/hostalComponents/ProgressCard";
import BacklogsTable from '@/components/table/BacklogsTable';
import Layout from '@/components/Sidemenu/Layout';

const   ClasssData= [
  { section: 'A', topic: 'Introduction to Programming', attendance: '2' },
  { section: 'B', topic: 'Data Structures ', attendance: '18' },
  { section: 'C', topic: '67890', attendance: '5' },
];
const Classheaders = ['Section', 'Topic', 'Attendance'];
function Page() {
  return (
    <>
    <Layout>
    <Box sx={{ flexGrow: 1, padding: '16px' }}>
      <Grid
        container
        spacing={2}
        justifyContent={{ xs: "center", sm: "center", md: "flex-start" }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <ProgressCard
            subject="Faceify"
            // paragraph="Total present in Faceify"
            paragraph={(
              <>
                Total <strong style={{ color: 'green' }}>Present</strong> in Digital Campus
              </>
            )}
            score="12/14"
            percentage={86}
            date="Last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ProgressCard
            subject="Faceify"
            paragraph={(
              <>
                Total <strong style={{ color: 'red' }}>Absentees</strong> in Digital Campus
              </>
            )}
            score="12/14"
            percentage={86}
            date="Last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <ProgressCard
          subject="Digital Campus"
          paragraph={(
            <>
              Total <strong style={{ color: 'green' }}>Present</strong> in Digital Campus
            </>
          )}
          score="12/14"
          percentage={86}
          date="Last month"
        />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ProgressCard
            subject="Digital Campus"
            paragraph={(
              <>
                Total <strong style={{ color: 'red' }}>Abseent</strong> in Digital Campus
              </>
            )}
            score="12/14"
            percentage={86}
            date="Last month"
          />
        </Grid>
      </Grid>

      <Grid container sm={12} sx={{ padding: "50px 0px" }}>
      <Grid item md={6} sm={12} sx={{ padding: "50px 10px" }}>
        <BacklogsTable headers={Classheaders} data={ClasssData}  hedding="Today's Class" subHedding="Attendance and completion status."/>
      </Grid>

        <Grid item md={6} sm={12} sx={{ padding: "50px 10px" }}>
         <BacklogsTable headers={Classheaders} data={ClasssData}  hedding="Today's Class" subHedding="Attendance and completion status."/>
        </Grid>
        </Grid>
    </Box>
    </Layout>

    </>
  );
}

export default Page;

"use client"
import React, { useState, useEffect } from 'react';
import Collegedp from '@/components/dropdown/Collegedp';
import Coursedp from '@/components/dropdown/Coursedp';
import SemDp from '@/components/dropdown/SemDp';
import YearDp from '@/components/dropdown/YearDp';
import Departmentdp from '@/components/dropdown/Departmentdp';
import SectionDp from '@/components/dropdown/SectionDp';
import Typedp from '@/components/dropdown/Typedp';
import { Grid, Button, AlertColor,Box,Typography } from '@mui/material';
import CustomSnackbar from "@/components/CustomSnackbar";
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
import NoofPeriod from '@/components/pagescomponents/NoofPeriod';
import SubjecttoFaculty from '@/components/pagescomponents/SubjecttoFaculty';
import CreateLabbatch from '@/components/pagescomponents/CreateLabbatch';
import Academicyeardp from '@/components/dropdown/Academicyeardp';
import PageTitle from "@/components/PageTitle";
import Facultytobatch from '@/components/pagescomponents/Facultytobatch';
import Layout from '@/components/Sidemenu/Layout';

interface SelectedData {
  schoolId: string;
  courseId: string;
  year: string;
  sem: string;
  branch: string;
  section: string;
  acadamicid:string;
  type: string;
}

const ClassComponent: React.FC = () => {
  const [selectedData, setSelectedData] = useState<SelectedData>({
    schoolId: '',
    courseId: '',
    year: '',
    sem: '',
    branch: '',
    section: '',
    acadamicid:'',
    type: '',
  });
  const [datatype, setdatatype] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Message, setMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('error');

  const handleOrgSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      schoolId: value,
    })); setdatatype('');
  };

  const handleCourseSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      courseId: value,
    }));
    setdatatype('');
  };

  const handleyearSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      year: value,
    })); setdatatype('');
  };

  const handlesemSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      sem: value,
    })); setdatatype('');
  };

  const handlebranchSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      branch: value,
    })); setdatatype('');
  };

  const handlesectionSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      section: value,
    })); setdatatype('');
  };

  const handletypeSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      type: value,
    })); setdatatype('');
  };
  const handleacadamicidSelect = (label: string, value: string) => {
    setSelectedData((prev) => ({
      ...prev,
      acadamicid: value,
    }));
    setdatatype('');
  };
  
  useEffect(() => {
    const usertype = localStorage.getItem('usertype');
    if (usertype === "ceo") {
    } else {
      ceofetchCourseOptions();
    }
  }, []);

  const ceofetchCourseOptions = async () => {
    try {
      const token = localStorage.getItem('token') || undefined;
      const username = localStorage.getItem('username');
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      const filteredstaff = fetchedData.filter((college: any) => college.employeid === username);
      const ebranchid1 = filteredstaff[0].branchid;
      const eorgid = filteredstaff[0].orgid;
      setSelectedData((prev) => ({
        ...prev,
        schoolId: eorgid,
      }));
      const apiEndpointbr = `${DIGITAL_CAMPUS_BASE_URL}/tblbranchdtls`;
      const fetchedDatabr = await fetchCardDetailstoken(apiEndpointbr, 'GET',null,token);
      const filteredbr = fetchedDatabr.filter((college: any) => college.branchid === ebranchid1);
      const ebranchshortname = filteredbr[0].branchshortname;
      const ecourseid = filteredbr[0].courseid;
      setSelectedData((prev) => ({
        ...prev,
        courseId: ecourseid,
      }));
      const ebranchid = filteredbr[0].branchid;
      if (ebranchshortname === "HS") {

      } else {
        setSelectedData((prev) => ({
          ...prev,
          branch: ebranchid,
        }));
      }
      const url = `${DIGITAL_CAMPUS_BASE_URL}/Acadamicyearview`;
      const academicData = await fetchCardDetailstoken(url, 'GET',null,token);
      const filteredacademic= academicData.filter((college: any) => college.orgid  === eorgid);
      const filteredacademic1= academicData.filter((college: any) => college.orgid  === eorgid && college.status==='Present');
      const eacadamicid = filteredacademic1[0].acadamicid;
      setSelectedData((prev) => ({
        ...prev,
        acadamicid: eacadamicid,
      }));
    } catch (error) {
      console.error('Error fetching school options:', error);
    }
  };

  const handleSubmit = () => {
    setdatatype('');
    const {
      schoolId,
      courseId,
      year,
      sem,
      branch,
      section,
      type,
      acadamicid
    } = selectedData;
    if (
      !schoolId || !courseId || !year || !sem || !branch || !section || !type ||!acadamicid||
      schoolId === '0' || courseId === '0' || year === '0' || sem === '0' || branch === '0' || section === '0' || type === '0'||acadamicid==='0'
    ) {
      setErrorMessage('Please make sure all selections are made and not empty.');
      const selected = `All selections are valid made and not empty: 
      School ID: ${schoolId}, 
      Course ID: ${courseId}, 
      Year: ${year}, 
      Semester: ${sem}, 
      Branch: ${branch}, 
      Section: ${section}, 
      Type: ${type}`;

      setMessage(selected);
      setSnackbarOpen(true);
      setSeverity('error');
      setTimeout(() => {
        setSnackbarOpen(false);
        setMessage(null);
      }, 10000);
    } else {
        setErrorMessage('');
        setdatatype(type);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setMessage(null);
  };

  return (
    <>
    <Layout>
    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <Box flexGrow={1} >
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }} gutterBottom>TT Config Details</Typography>
          <Typography variant="body1" paragraph>
              Easily generate your class timetable by selecting the academic year and semester. Once you've made your selections, click "Submit" to view and organize your schedule for the semester.
          </Typography>
      </Box>
    </Box>
    <PageTitle title='TT Config'/>
      <CustomSnackbar
        open={isSnackbarOpen}
        onClose={handleCloseSnackbar}
        severity={severity}
        message={Message}
      />
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Collegedp onSelectOrg={handleOrgSelect} selectedOrg={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Coursedp onSelectcourse={handleCourseSelect} selectedcourse={selectedData.courseId} orgid={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Academicyeardp onSelectacademic={handleacadamicidSelect} selectedacademic={selectedData.acadamicid} orgid={selectedData.schoolId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Departmentdp onSelectbranch={handlebranchSelect} selectedbranch={selectedData.branch} courseid={selectedData.courseId} />
        </Grid>
        <Grid item xs={6} md={3}>
          <YearDp onSelectYear={handleyearSelect} selectedYear={selectedData.year} courseid={parseInt(selectedData.courseId)} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SemDp onSelectSem={handlesemSelect} selectedSem={selectedData.sem} courseid={parseInt(selectedData.courseId)} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectionDp onSelectSection={handlesectionSelect} selectedSection={selectedData.section} branchId={selectedData.branch} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Typedp onSelectType={handletypeSelect} selectedType={selectedData.type} />
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Get
          </Button>
        </Grid>
      </Grid>
      {errorMessage && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </Grid>
        </Grid>
      )}
      {datatype === 'No Of Periods' && (
        <NoofPeriod  orgid={parseInt(selectedData.schoolId)}
        courseId={parseInt(selectedData.courseId)}
        year={parseInt(selectedData.year)}
        sem={parseInt(selectedData.sem)}
        branch={parseInt(selectedData.branch)}
        section={selectedData.section}
        acadamicid={parseInt(selectedData.acadamicid)}/>
      )}

{datatype === 'Subject To Faculty' && (
        <SubjecttoFaculty  orgid={parseInt(selectedData.schoolId)}
        courseId={parseInt(selectedData.courseId)}
        year={parseInt(selectedData.year)}
        sem={parseInt(selectedData.sem)}
        branch={parseInt(selectedData.branch)}
        section={selectedData.section}
        acadamicid={parseInt(selectedData.acadamicid)}/>
      )}

{datatype === 'Create Lab Batch' && (
        <CreateLabbatch  orgid={parseInt(selectedData.schoolId)}
        courseId={parseInt(selectedData.courseId)}
        year={parseInt(selectedData.year)}
        sem={parseInt(selectedData.sem)}
        branch={parseInt(selectedData.branch)}
        section={selectedData.section}
        acadamicid={parseInt(selectedData.acadamicid)}/>
      )}

      {datatype === 'Faculty To Lab Batch' && (
        <Facultytobatch  orgid={parseInt(selectedData.schoolId)}
        courseId={parseInt(selectedData.courseId)}
        year={parseInt(selectedData.year)}
        sem={parseInt(selectedData.sem)}
        branch={parseInt(selectedData.branch)}
        section={selectedData.section}
        acadamicid={parseInt(selectedData.acadamicid)}/>
      )}
    </Layout>

    </>
  );
};

export default ClassComponent;
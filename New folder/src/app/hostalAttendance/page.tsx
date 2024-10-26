"use client"; // Ensure this is client-side only
import { Suspense, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Chip,
  Button,
  Box,
  Paper,
} from "@mui/material";
import Image from 'next/image'
import BacklogsTable from "@/components/table/BacklogsTable"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Sidemenu/Layout";

import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { Margin } from "@mui/icons-material";
import QrCodeComponent from "@/components/qrCode/qr"
interface Student {
  name: string;
  year: string;
  department: string;
  id: string;
  gender: "Male" | "Female";
  status: "Enabled" | "Disabled";
  avatarUrl: string;
}

const studentsData: Student[] = [
  {
    name: "CHINTA ANUSHA",
    year: "1st Year-ECE-AA",
    department: "ECE",
    id: "24ATA04038",
    gender: "Female",
    status: "Enabled",
    avatarUrl: "/student-female-avatar.png",
  },
];

const StudentList = ({ suspense }: any) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    gender: "female",
    status: "Enabled",
    academicYear: "2024",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Ensure this is only called client-side within Suspense boundary
  const paramValue = useSearchParams(); 
  console.log(paramValue.get("paramName"));

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );
  const errorMessage = filteredStudents.length === 0 ? "No students found." : "";
  const backlogsData = [
    { name: 'Section', enrollment: '54321', backlogs: '2' },
    { name: 'Liam Patel', enrollment: '98765', backlogs: '18' },
    { name: 'Sophia Nguyen', enrollment: '67890', backlogs: '5' },
  ];
 
  const headers = ['Name', 'Enrollment', 'Backlogs'];
  return (
    <Layout>
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "97%",
          height: "300px",
          marginTop: "20px",
          borderRadius: "5px",
          background: "linear-gradient(to top,#9CECFB,  #3b51ff,#0052D4 )",
          zIndex: "-10",
          position: "absolute",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div>
          <Typography variant="h5" component="h2" style={{ color: "white" }}>
            Heading
          </Typography>
       
        </div>
      </div>

      <div
        style={{
          width: "90%",
          backgroundColor: "red",
          margin: "10% 0",
          borderRadius: "5px",
        }}
      >
        <Paper elevation={3} style={{ padding: "20px"}}>
        <div style={{ display: "flex",width:"100wh", marginTop: "20px",justifyContent:"space-between" }}>

            <TextField
              label="Search student..."
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              size="small"
            />
            <div style={{backgroundColor:"#e0e0e0",borderRadius:"10px",marginRight:"20px"}}>
                  <Typography variant="body1" component="h2" style={{ color: "black",padding:"10px" }}>
                  Total present in Facieify and absent in digital campus <span>10</span>
                  </Typography>
            </div>
            <div style={{backgroundColor:"#e0e0e0",borderRadius:"10px",marginRight:"20px"}}>
            <Typography variant="body1" component="h2" style={{ color: "black",padding:"10px" }}>
                  Total present in Facify <span>10</span>
                  </Typography>
            </div>
            <div style={{backgroundColor:"#e0e0e0",padding:"10px",borderRadius:"10px",marginRight:"20px"}}>
            <Typography variant="body1" component="h2" style={{ color: "black" }}>
                  Total present in Facify <span>10</span>
                  </Typography>
            </div>
            <div>

        </div>
        <div>
           
        </div>

          
          </div>
          {/* Display error message if no students are found */}
          {errorMessage ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
              }}
            >
                    <Image
                src="/nodata1.svg"
                width={300}
                    height={300}
                    alt="Picture of the author"
                  />
             
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Something went wrong
                </Typography>
                <Typography variant="body1" color="error">
                  {errorMessage}
                </Typography>
              </div>
            </Box>
          ) : (
            // <Grid container spacing={2}>
            //   {filteredStudents.map((student) => (
            //     <Grid item xs={12} sm={6} md={4} key={student.id}>
            //       <Card>
            //         <CardContent style={{ display: "flex", alignItems: "center" }}>
            //           <Avatar
            //             src={student.avatarUrl}
            //             alt={student.name}
            //             sx={{ width: 56, height: 56, marginRight: "10px" }}
            //           />
            //           <div style={{ flexGrow: 1 }}>
            //             <Typography variant="h6" style={{ fontWeight: "bold" }}>
            //               {student.name}
            //             </Typography>
            //             <Typography variant="body2" color="textSecondary">
            //               {student.year}
            //             </Typography>
            //             <Typography variant="body2" color="textSecondary">
            //               {student.id}
            //             </Typography>
            //           </div>
            //           <IconButton color="primary">
            //             <Link href="/dashbord3">
            //               <EditIcon />
            //             </Link>
            //           </IconButton>
            //         </CardContent>
            //       </Card>
            //     </Grid>
            //   ))}
            // </Grid>
            <>
            <BacklogsTable headers={headers} data={backlogsData} hedding="Block wise pending" subHedding="View students with pending assignments or exams."/>
            <BacklogsTable headers={headers} data={backlogsData} hedding="Collage and year pending" subHedding="View students with pending assignments or exams."/>
            <BacklogsTable headers={headers} data={backlogsData} hedding="Pending List " subHedding="View students with pending assignments or exams."/>

            </>
          )}
        </Paper>

      </div>
    </div>
  </Layout>
  );
};

// Wrap the component with Suspense for client-side hooks like useSearchParams
export default function StudentListWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentList />
    </Suspense>
  );
}

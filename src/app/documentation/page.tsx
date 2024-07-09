"use client";
import { Navbar } from "@/components/landing-page/Navbar";
import React, { useState } from 'react';
import { Container, Typography, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const administrationHierarchy = [
  { title: 'Principal', name: 'Sobha Cyrus' },
  { title: 'Head of Departments', name: 'Dr.Sudheep Elayidom' },
  { title: 'Coordinator', name: 'Mrs.Preetha S' },
  { title: 'Coordinator', name: 'RENJUSHA ARAVIND' },
  { title: 'Professors', name: 'Dr.Sheena Mathew' },
  { title: 'Associate Professors', name: 'Mrs.Ancy Zacharia' },
  { title: 'Associate Professors', name: 'Mr.Pramod Pavithran' },
  { title: 'Associate Professors', name: 'Mr.V DAMODARAN' },
  { title: 'Associate Professors', name: 'Mr.Vinod Kumar P P' },
  { title: 'Associate Professors', name: 'Dr.Latha R Nair' },
  { title: 'Associate Professors', name: 'Mrs. Chaithanya C' },
  { title: 'Associate Professors', name: 'Ms.Fanny May Joseph' },
  { title: 'Associate Professors', name: 'Mrs.Preetha S' },
  { title: 'Associate Professors', name: 'Ms.Aiswarya Sudhakar' },
  { title: 'Associate Professors', name: 'Ms.Amrutha S Nair' },
  { title: 'Associate Professors', name: 'Mrs. Minu Poulose' },
  { title: 'Associate Professors', name: 'Ms.Jeeva Susan Jacob' },
  { title: 'Associate Professors', name: 'Ms.FAMEELA K A' },
  { title: 'Associate Professors', name: 'Mrs.Sheena S' },
  { title: 'Associate Professors', name: 'Mrs.RENJUSHA ARAVIND' },
  { title: 'Associate Professors', name: 'Mr.Alen Thomas' },
  { title: 'Administrative Staff', name: 'Various' },
];

const bonafideHierarchy = [
  { title: 'Head of Departments', name: 'Dr.Sudheep Elayidom' },
  { title: 'Coordinator', name: 'Mrs.Preetha S' },
  { title: 'Coordinator', name: 'RENJUSHA ARAVIND' },
];
const DutyLeaveHierarchy = [
  { title: 'Head of Departments', name: 'Dr.Sudheep Elayidom' },
  { title: 'Coordinator', name: 'Mrs.Preetha S' },
  { title: 'Coordinator', name: 'RENJUSHA ARAVIND' },
];
const MedicalLeaveHierarchy = [
  { title: 'Principal', name: 'Sobha Cyrus' },
  { title: 'Head of Departments', name: 'Dr.Sudheep Elayidom' },
  { title: 'Coordinator', name: 'Mrs.Preetha S' },
  { title: 'Coordinator', name: 'RENJUSHA ARAVIND' },
  
];

const GraceMarksHierarchy = [
  { title: 'Principal', name: 'Sobha Cyrus' },
  { title: 'Head of Departments', name: 'Dr.Sudheep Elayidom' },
  { title: 'Coordinator', name: 'Mrs.Preetha S' },
  { title: 'Coordinator', name: 'RENJUSHA ARAVIND' },
  
];

const DocumentationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdministrationHierarchy = administrationHierarchy.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBonafideHierarchy = bonafideHierarchy.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDutyLeaveHierarchy = DutyLeaveHierarchy.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMedicalLeaveHierarchy = MedicalLeaveHierarchy.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredGraceMarksHierarchy = GraceMarksHierarchy.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar />
    <Container>
      <Typography variant="h2" gutterBottom align="center" sx={{ marginTop: '20px' }}>
        College Administration Hierarchy
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Title</Typography></TableCell>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdministrationHierarchy.map((role, index) => (
              <TableRow key={index}>
                <TableCell>{role.title}</TableCell>
                <TableCell>{role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '20px' }}>
        Hierarchy for Bonafide Application Approval
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Title</Typography></TableCell>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBonafideHierarchy.map((role, index) => (
              <TableRow key={index}>
                <TableCell>{role.title}</TableCell>
                <TableCell>{role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '20px' }}>
        Hierarchy for Duty Leave Application
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Title</Typography></TableCell>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDutyLeaveHierarchy.map((role, index) => (
              <TableRow key={index}>
                <TableCell>{role.title}</TableCell>
                <TableCell>{role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '20px' }}>
        Hierarchy for Medical Leave Application
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Title</Typography></TableCell>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMedicalLeaveHierarchy.map((role, index) => (
              <TableRow key={index}>
                <TableCell>{role.title}</TableCell>
                <TableCell>{role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '20px' }}>
        Hierarchy for Grace Marks Application
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Title</Typography></TableCell>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGraceMarksHierarchy.map((role, index) => (
              <TableRow key={index}>
                <TableCell>{role.title}</TableCell>
                <TableCell>{role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
};

export default DocumentationPage;
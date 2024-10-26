// components/CompanyForm.tsx
 
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchCardDetailstoken } from '@/modules/apitoken';
import { DIGITAL_CAMPUS_BASE_URL } from '@/modules/apiConfig';
interface FormData {
  companyName: string;
  companyShortName: string;
  logoUrl: File | null; // Allow null
  package: string;
  registerType: string;
}
 
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  companyShortName: Yup.string().required('Short Name is required'),
  logoUrl: Yup.mixed()
    .nullable()
    .required('Logo is required')
    .test('fileSize', 'File size is too large. Maximum allowed is 2MB.', (value) => {
      if (!value || !(value instanceof File)) return false; // Ensures file exists and is of type File
      return value.size <= 2 * 1024 * 1024; // Limit to 2MB
    }),
  package: Yup.string().required('Package selection is required'),
  registerType: Yup.string().required('Registration Type is required'),
});
 
const CompanyForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [dataList, setDataList] = useState<FormData[]>([]);
 
  // State for controlling dialog visibility
  const [open, setOpen] = useState(false);
 
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
  });
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token') || undefined;
        const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
        const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
        setDataList(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);
 
  const onSubmit = async (data: FormData) => {
    console.log(data);
    const formData = new FormData();
    if (data.logoUrl) {
      formData.append('logo', data.logoUrl); // Append the file directly
    }
 
    // Submit formData to your API endpoint
    try {
      await fetch('/api/companies', { // Replace with your API endpoint
        method: 'POST',
        body: formData,
      });
 
      // Optionally re-fetch the data after submission
      const token = localStorage.getItem('token') || undefined;
      const apiEndpoint = `${DIGITAL_CAMPUS_BASE_URL}/allEmployeeDetails`;
      const fetchedData = await fetchCardDetailstoken(apiEndpoint, 'GET',null,token);
      setDataList(fetchedData);
 
      // Set the submitted data to state for viewing
      setSubmittedData(data);
     
      // Close the dialog after submission
      setOpen(false);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
 
  return (
    <Box>
      {/* Button to open the dialog */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Open Company Form
      </Button>
 
      {/* Dialog for the form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Company Registration</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Company Name"
              fullWidth
              margin="normal"
              {...register('companyName')}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
            />
 
            <TextField
              label="Company Short Name"
              fullWidth
              margin="normal"
              {...register('companyShortName')}
              error={!!errors.companyShortName}
              helperText={errors.companyShortName?.message}
            />
 
            <TextField
              type="file"
              fullWidth
              margin="normal"
              inputProps={{ accept: "image/*" }} // Optional: limit to image files
              onChange={(e) => {
                const target = e.target as HTMLInputElement; // Cast target to HTMLInputElement
                if (target.files && target.files[0]) {
                  setValue('logoUrl', target.files[0]); // Set the file in form data
                }
              }}
              error={!!errors.logoUrl}
              helperText={errors.logoUrl?.message}
            />
 
            <TextField
              select
              label="Package"
              fullWidth
              margin="normal"
              {...register('package')}
              error={!!errors.package}
              helperText={errors.package?.message}
            >
              <MenuItem value="basic">Basic</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
            </TextField>
 
            <TextField
              select
              label="Registration Type"
              fullWidth
              margin="normal"
              {...register('registerType')}
              error={!!errors.registerType}
              helperText={errors.registerType?.message}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </TextField>
 
            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
 
      {/* Display submitted data */}
      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6">Submitted Data:</Typography>
          <Typography><strong>Company Name:</strong> {submittedData.companyName}</Typography>
          <Typography><strong>Company Short Name:</strong> {submittedData.companyShortName}</Typography>
          <Typography><strong>Logo:</strong> {submittedData.logoUrl?.name || 'No logo uploaded'}</Typography>
          <Typography><strong>Package:</strong> {submittedData.package}</Typography>
          <Typography><strong>Registration Type:</strong> {submittedData.registerType}</Typography>
        </Box>
      )}
 
      {/* Display list of all submissions */}
      {dataList.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">All Submitted Companies:</Typography>
          {dataList.length > 0 ? (
  dataList.map((item, index) => (
    <Box key={index} mb={2}>
      <Typography><strong>Company Name:</strong> {item.companyName}</Typography>
      <Typography><strong>Company Short Name:</strong> {item.companyShortName}</Typography>
      <Typography><strong>Logo:</strong> {item.logoUrl?.name || 'No logo uploaded'}</Typography>
      <Typography><strong>Package:</strong> {item.package}</Typography>
      <Typography><strong>Registration Type:</strong> {item.registerType}</Typography>
    </Box>
  ))
) : (
  <Typography>No data</Typography> // Display this message when there is no data
)}
        </Box>
      )}
    </Box>
  );
};
 
export default CompanyForm;
import {Box} from '@mui/material';
import MuiButton from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import {Home} from 'lucide-react';

export default function Inconsistent() {
  return (
    <Box>
      <MuiButton startIcon={<Home />}>Home</MuiButton>
      <DataGrid rows={[]} columns={[]} />
    </Box>
  );
}

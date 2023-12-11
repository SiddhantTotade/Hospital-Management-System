import { useState } from "react";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import InputField from "./Input";
import { useRegisterBlog } from "../hooks/registerBlog";
import { useGetCategoryQuery } from "../services/appApiServices";
import { useAuth } from "../context/AuthContext";
import AppAlert from "./Alerts";

export default function UploadBlog() {
  const { handleSubmit, isLoading, onSubmit, control, message } =
    useRegisterBlog();
  const { getToken } = useAuth();
  const { data } = useGetCategoryQuery(getToken()["access"]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");

  return (
    <>
      <PrirmaryButton onClick={() => setOpen(true)} label="Uplaod Blog" />
      <AppDialog title="Upload Blog" open={open} onClose={() => setOpen(false)}>
        <FormControl
          component="form"
          fullWidth
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            gap: "10px",
            display: open ? "grid" : "none",
            justifyItems: "center",
            marginTop: "5px",
          }}
        >
          <InputLabel id="blog_category">Select Category</InputLabel>
          <Select
            labelId="blog_category"
            id="demo-multiple-name"
            fullWidth
            value={category}
            onChange={(e: SelectChangeEvent) =>
              setCategory(e.target.value as string)
            }
            input={<OutlinedInput label="Select Category" />}
          >
            {data?.map((category, id) => (
              <MenuItem key={id} value={category}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
          {["Title", "Content", "Summary"].map((field, id) => (
            <InputField
              key={id}
              control={control}
              name={field}
              multiline
              rows={field === "Content" || field === "Summary" ? 5 : ""}
              label={field}
              type="text"
            />
          ))}
          <TextField fullWidth type="file" />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PrirmaryButton type="submit" label="Upload" />
          )}
        </FormControl>
      </AppDialog>
      <AppAlert message={message} />
    </>
  );
}
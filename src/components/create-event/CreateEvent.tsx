import React, { Dispatch, SetStateAction, useState } from 'react';
import { 
  CreateEventContainer, 
  Form, 
  Input, 
  Label, 
  RemoveTagButton, 
  SubmitButton, 
  Tag, 
  TagInputContainer, 
  TagList, 
  TextArea, 
  Title 
} from './CreateEvent.styled';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { Event } from '../../types/Event';


type CreateComponentProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  addEventToList: (newEvent: Event) => void; 
};

const CreateEvent: React.FC<CreateComponentProps> = ({ setShow, addEventToList }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(''); // ✅ New state for date
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUser();

  const createEvent = async () => {
    const token = localStorage.getItem('jwt');

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:8000/api/events',
        {
          title,
          description,
          location,
          date, // ✅ Sending selected date
          tags,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
       
      const newEvent = response.data.event; // ✅ Extract created event

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          createdEvents: [...prevUser.createdEvents, response.data.event._id],
        };
      });

      addEventToList(newEvent); // ✅ Add new event to the Dashboard list


      console.log(response.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!title.trim() || !location.trim() || !description.trim() || !date) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    createEvent();
  };

  return (
    <CreateEventContainer>
      <Title>Create Event</Title>
      <Form>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter event location"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description"
          />
        </div>

        {/* ✅ New Date Input */}
        <div>
          <Label htmlFor="date">Event Date</Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <TagInputContainer>
          <Label htmlFor="tags">Tags</Label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag"
            />
            <SubmitButton type="button" onClick={handleAddTag}>Add Tag</SubmitButton>
          </div>
          <TagList>
            {tags.map((tag) => (
              <Tag key={tag}>
                {tag}
                <RemoveTagButton onClick={() => handleRemoveTag(tag)}>x</RemoveTagButton>
              </Tag>
            ))}
          </TagList>
        </TagInputContainer>

        <SubmitButton type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </SubmitButton>
      </Form>
    </CreateEventContainer>
  );
};

export default CreateEvent;

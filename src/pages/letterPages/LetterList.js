import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function LetterList() {
  return (
    <Box sx={{ width: '100%', height: '100%'}}>
      <ImageList sx={{ width: "100%", height: "100%", marginX: "2%" }} variant="masonry" cols={4} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: '/static/images/letter1.jpg',
    title: 'Bed',
  },
  {
    img: '/static/images/letter2.jpg',
    title: 'Books',
  },
  {
    img: '/static/images/letter3.jpg',
    title: 'Sink',
  },
  {
    img: '/static/images/letter11.jpg',
    title: 'Kitchen',
  },
  {
    img: '/static/images/letter5.jpg',
    title: 'Blinds',
  },
  {
    img: '/static/images/letter6.jpg',
    title: 'Chairs',
  },
  {
    img: '/static/images/letter7.jpg',
    title: 'Laptop',
  },
  {
    img: '/static/images/letter8.jpg',
    title: 'Doors',
  },
  {
    img: '/static/images/letter9.jpg',
    title: 'Coffee',
  },
  {
    img: '/static/images/letter10.jpg',
    title: 'Storage',
  },
  {
    img: '/static/images/letter4.jpg',
    title: 'Candle',
  },
  {
    img: '/static/images/letter4-contd.jpg',
    title: 'Coffee table',
  },
];

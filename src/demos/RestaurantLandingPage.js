import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import TabGrid from "components/cards/TabCardGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import chefIconImageSrc from "images/letter.png";
import celebrationIconImageSrc from "images/law.png";
import shopIconImageSrc from "images/magazine.png";

import "./before-and-after.css";

//mui additions
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-[#1976d2] text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  console.log('demo page');
  return (
    <AnimationRevealPage>
    <Hero />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Checkout our <HighlightedText>Events.</HighlightedText>
          </>
        }
      />
      <Features className='before-and-after'
        heading={
          <>
            Amazing <HighlightedText>Features.</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc: shopIconImageSrc,
            title: "The Ihediwa eBook",
            description: "Get access to the Ihediwa ebook! Featuring updated family tree and more. ",
            url: "#"
          },
          {
            imageSrc: chefIconImageSrc,
            title: "Letters",
            description: "View letters sent by our parents and grandparents in the pre-digital era",
            url: "#"
          },
          {
            imageSrc: celebrationIconImageSrc,
            title: "Family Constitution",
            description: "View the revised family constitution as well as minutes of previous meetings",
            url: "/app/search"
          }
        ]}

        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      <MainFeature2
        subheading={<Subheading>A Desire to Create Value</Subheading>}
        heading={<>Ihediwa <HighlightedText>Projects</HighlightedText></>}
        statistics={[
          {
            key: "Ongoing Projects",
            value: "3",
          },
          {
            key: "Completed Projects",
            value: "5"
          }
        ]}
        primaryButtonText="View Projects"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="/static/images/plantation.jpg"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={<>Meet The <HighlightedText>Excos.</HighlightedText></>}
      />
      <DownloadApp
        text={<>Read about our Forefathers, their legacy and search through the <HighlightedTextInverse>Ihediwa Tree.</HighlightedTextInverse></>}
      />
      <Footer />
    </AnimationRevealPage>
  );
}

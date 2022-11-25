import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import LogoImage from "images/logo.svg";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";

const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-8 py-20 lg:py-24`;
const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
const SixColumns = tw.div`flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between -mt-12`;

const Column = tw.div`px-4 sm:px-0 sm:w-1/4 md:w-auto mt-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;

const LinkList = tw.ul`mt-6 text-sm font-medium list-none`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent focus:border-gray-700 pb-1 transition duration-300 no-underline decoration-0 text-black`;

const SubscribeNewsletterColumn = tw(Column)`text-center lg:text-left w-full! lg:w-auto! mt-20 lg:mt-12`;
const SubscribeNewsletterContainer = tw.div`max-w-sm mx-auto lg:mx-0 `;
const SubscribeText = tw.p`mt-2 lg:mt-6 text-sm font-medium text-gray-600`;
const SubscribeForm = tw.form`mt-4 lg:mt-6 text-sm sm:flex max-w-xs sm:max-w-none mx-auto sm:mx-0 before:box-border before:border-0 before:border-solid before:border-purple-200`;
const Input = tw.input`bg-gray-300 px-6 py-3 rounded sm:rounded-r-none sm:border-r-0 border-gray-400 hover:border-primary-500 focus:outline-none transition duration-300 w-full`;
const SubscribeButton = tw(PrimaryButtonBase)`mt-4 sm:mt-0 w-full sm:w-auto rounded sm:rounded-l-none px-8 py-3`;

const Divider = tw.div`my-16 border-b-2 border-gray-300 w-full`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black tracking-wider text-gray-800`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-500`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-700 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

export default () => {
  return (
    <Container>
      <Content>
        <SixColumns>
          <Column>
            <ColumnHeading>Main</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#">Blog</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">FAQs</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Support</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">About Us</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>History</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#">Amumara</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Otulu</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Ihediwa Uda</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Team</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Media</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#">Letters</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Events</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Gallery</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Media</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Legal</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="#">GDPR</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Privacy Policy</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Terms of Service</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="#">Disclaimer</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <SubscribeNewsletterColumn>
            <SubscribeNewsletterContainer>
              <ColumnHeading>Subscribe to our Newsletter</ColumnHeading>
              <SubscribeText>
                Follow the Ihediwa Updates and get timely information delivered to your mail.
              </SubscribeText>
              <SubscribeForm method="get" action="#">
                <Input type="email" placeholder="Your Email Address" style={{borderColor: 'rgb(255 255 255)'}} />
                <SubscribeButton type="submit" style={{border: '0px'}}>Subscribe</SubscribeButton>
              </SubscribeForm>
            </SubscribeNewsletterContainer>
          </SubscribeNewsletterColumn>
        </SixColumns>
      </Content>
    </Container>
  );
};

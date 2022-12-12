      import React, { useState } from "react";
      import AnimationRevealPage from "helpers/AnimationRevealPage.js";
      import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
      import tw from "twin.macro";
      import styled from "styled-components";
      import { css } from "styled-components/macro";
      import Header from "components/headers/light.js";
      import Footer from "components/footers/FiveColumnWithInputForm.js";
      import { SectionHeading } from "components/misc/Headings";
      import { PrimaryButton } from "components/misc/Buttons";

      import useToken from '../utils/useToken';
      import { fetchData } from '../utils/util_query';
      import { useQuery } from "react-query";
      import ULoadingComponent from '../components/UComponents/ULoadingComponent';
      import { GET_PROJECTS } from '../utils/server_auth_routes'; //remember to replace with projects path

      let projects_list = [];

      const HeadingRow = tw.div`flex`;
      const Heading = tw(SectionHeading)`text-gray-900`;
      const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
      const PostContainer = styled.div`
        ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
        ${props =>
          props.featured &&
          css`
            ${tw`w-full!`}
            ${Post} {
              ${tw`sm:flex-row! h-full sm:pr-4`}
            }
            ${Image} {
              ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
            }
            ${Info} {
              ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
            }
            ${Description} {
              ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
            }
          `}
      `;
      const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
      const Image = styled.div`
        ${props => css`background-image: url("${props.imageSrc}");`}
        ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
      `;
      const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
      const Category = tw.div`uppercase text-blue-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
      const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
      const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-blue-500 transition duration-300`;
      const Description = tw.div``;

      const ButtonContainer = tw.div`flex justify-center`;
      const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

      export default ({
        headingText = "Our Family Projects",
        posts = [

        ]
      }) => {
        const {token} = useToken();

        let payload_data = {
        };

        const result = useQuery(['projects_list',
              { url: GET_PROJECTS, payload_data, authenticate: true, token }],
              fetchData,
              {
                  retry: false,
                  onSuccess: (res) => {
                      const data = res?.data?.data;
                      console.log("data:", data);
                      projects_list = data;
                  },
                  onError: (error) => { console.log(error) }
              }
          );

          const { isLoading, isError, data, error, isFetching } = result;

          if (isLoading) {
              return (<ULoadingComponent />);
          }
          
        return (
          <AnimationRevealPage>
            <Container>
              <ContentWithPaddingXl>
                <HeadingRow>
                  <Heading>{headingText}</Heading>
                </HeadingRow>
                <Posts>
                  {projects_list.map((project, index) => (
                    <PostContainer key={index} featured={project.featured}>
                      <Post className="group" as="a" href={project.cover_image} style={{textDecoration:"inherit"}}>
                        <Image imageSrc={project.cover_image} />
                        <Info>
                          <Category>{project.category}</Category>
                          <div style={{display: 'block', width: '2rem', borderBottomWidth: '2px', borderColor: 'rgb(237 108 2)'}} />
                          <CreationDate>{project.commencement_date}</CreationDate>
                          <Title>{project.title}</Title>
                          {project.featured && project.details && <Description>{project.details}</Description>}
                        </Info>
                      </Post>
                    </PostContainer>
                  ))}
                </Posts>
              </ContentWithPaddingXl>
            </Container>
            <Footer />
          </AnimationRevealPage>
        );
      };
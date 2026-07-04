import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { blogs } from '../../data/blogs/index.js';
import CreateIcon from '@mui/icons-material/Create';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// ─── Styled Components ────────────────────────────────────────────

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 20px 100px;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 0;
`;

const Header = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const IconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #854CE6 0%, #DA22FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(133, 76, 230, 0.5);
`;

const Title = styled.h1`
  font-size: 52px;
  text-align: center;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(225deg, #854CE6 0%, #DA22FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 768px) { font-size: 36px; }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 32px;
  line-height: 1.6;
  @media (max-width: 768px) { font-size: 15px; }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StatNum = styled.span`
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #854CE6, #DA22FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Tag filter bar
const TagBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 48px;
`;

const TagChip = styled.button`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1.5px solid ${({ active, theme }) => active ? '#854CE6' : 'rgba(255,255,255,0.12)'};
  background: ${({ active }) => active ? 'linear-gradient(135deg, #854CE6 0%, #DA22FF 100%)' : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.text_secondary};
  box-shadow: ${({ active }) => active ? '0 0 14px rgba(133,76,230,0.4)' : 'none'};

  &:hover {
    border-color: #854CE6;
    color: #fff;
    background: linear-gradient(135deg, rgba(133,76,230,0.3), rgba(218,34,255,0.3));
  }
`;

// Blog grid
const BlogGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 28px;
  width: 100%;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const BlogCard = styled(motion.article)`
  background: rgba(23, 23, 33, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.35s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px -10px rgba(133, 76, 230, 0.4);
    border-color: rgba(133, 76, 230, 0.4);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 210px;
  overflow: hidden;
  position: relative;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BlogCard}:hover & {
    transform: scale(1.06);
  }
`;

const ReadTimeBadge = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardBody = styled.div`
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DateLine = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: 0.3px;
`;

const BlogTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 10px;
  line-height: 1.4;
  transition: color 0.2s ease;

  ${BlogCard}:hover & {
    color: #854CE6;
  }
`;

const Excerpt = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.65;
  margin-bottom: 18px;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Tag = styled.span`
  background: rgba(133, 76, 230, 0.1);
  color: #854CE6;
  padding: 3px 11px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  border: 1px solid rgba(133,76,230,0.25);
`;

const ReadMoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
`;

const ReadMore = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #854CE6;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.2s ease;

  ${BlogCard}:hover & {
    gap: 8px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  grid-column: 1/-1;
`;

// ─── Animation Variants ───────────────────────────────────────────
const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } }
};

// ─── Collect all unique tags ──────────────────────────────────────
const allTags = ['All', ...Array.from(new Set(blogs.flatMap(b => b.tags || [])))];

// ─── Total reading time ───────────────────────────────────────────
const totalMinutes = blogs.reduce((acc, b) => {
  const mins = parseInt(b.readTime) || 0;
  return acc + mins;
}, 0);

// ─── BlogListing Component ────────────────────────────────────────
const BlogListing = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const filtered = activeTag === 'All'
    ? blogs
    : blogs.filter(b => b.tags?.includes(activeTag));

  return (
    <Container>
      <Wrapper>
        {/* Header */}
        <Header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <TitleRow>
            <IconWrap>
              <CreateIcon style={{ color: '#fff', fontSize: '26px' }} />
            </IconWrap>
            <Title>Blog</Title>
          </TitleRow>

          <Desc>
            Deep-dives on AI, machine learning, systems engineering, and building things that matter.
          </Desc>

          {/* Stats */}
          <StatsRow>
            <Stat>
              <StatNum>{blogs.length}</StatNum>
              <StatLabel>Articles</StatLabel>
            </Stat>
            <Stat>
              <StatNum>{allTags.length - 1}</StatNum>
              <StatLabel>Topics</StatLabel>
            </Stat>
            <Stat>
              <StatNum>{totalMinutes}+</StatNum>
              <StatLabel>Min of Content</StatLabel>
            </Stat>
          </StatsRow>

          {/* Tag filter */}
          <TagBar>
            {allTags.map(tag => (
              <TagChip
                key={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              >
                {tag === 'All' ? <><LocalOfferIcon style={{ fontSize: '12px', marginRight: '4px' }} />All</> : tag}
              </TagChip>
            ))}
          </TagBar>
        </Header>

        {/* Blog cards grid */}
        <BlogGrid
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <EmptyState>No posts found for "{activeTag}" yet. Check back soon!</EmptyState>
            ) : (
              filtered.map((blog) => (
                <BlogCard
                  key={blog.id}
                  variants={cardVariants}
                  layout
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  <ImageWrapper>
                    <CoverImage src={blog.coverImage} alt={blog.title} loading="lazy" />
                    <ReadTimeBadge>
                      <AccessTimeIcon style={{ fontSize: '11px' }} />
                      {blog.readTime}
                    </ReadTimeBadge>
                  </ImageWrapper>

                  <CardBody>
                    <DateLine>{blog.date}</DateLine>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <Excerpt>{blog.excerpt}</Excerpt>

                    <Tags>
                      {blog.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </Tags>

                    <ReadMoreRow>
                      <ReadMore>Read article →</ReadMore>
                    </ReadMoreRow>
                  </CardBody>
                </BlogCard>
              ))
            )}
          </AnimatePresence>
        </BlogGrid>
      </Wrapper>
    </Container>
  );
};

export default BlogListing;

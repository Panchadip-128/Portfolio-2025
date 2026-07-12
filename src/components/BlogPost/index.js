import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { blogs } from '../../data/blogs/index.js';
import { Bio } from '../../data/constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import hero_img from '../../images/HeroImage.jpg';

// ─── Styled Components ────────────────────────────────────────────
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  position: relative;
  z-index: 1;
  padding-bottom: 80px;
`;

const CoverImage = styled(motion.img)`
  width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled(motion.div)`
  max-width: 820px;
  width: 100%;
  padding: 60px 28px 0;
  margin-top: -80px;
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.bg};
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -20px 40px rgba(0,0,0,0.3);
  @media (max-width: 768px) { margin-top: -40px; padding: 40px 16px 0; }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${({ theme }) => theme.text_secondary};
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 30px;
  padding: 0;
  transition: color 0.3s ease;
  &:hover { color: ${({ theme }) => theme.primary}; }
`;

const TagRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;
`;

const Tag = styled.span`
  background: rgba(133, 76, 230, 0.12);
  color: ${({ theme }) => theme.primary};
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 1px solid rgba(133, 76, 230, 0.3);
`;

const PostTitle = styled.h1`
  font-size: 44px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
  line-height: 1.2;
  @media (max-width: 768px) { font-size: 28px; }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const AuthorAvatar = styled.img`
  width: 48px; height: 48px;
  border-radius: 50%; object-fit: cover;
  border: 2px solid ${({ theme }) => theme.primary};
`;

const AuthorName = styled.span`
  font-weight: 600; color: ${({ theme }) => theme.text_primary}; font-size: 16px;
`;

const DateReadTime = styled.span`
  font-size: 13px; color: ${({ theme }) => theme.text_secondary};
`;

const ContentArea = styled.div`
  padding-bottom: 60px;
`;

// Block-level components
const Para = styled.p`
  font-size: 18px;
  line-height: 1.85;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
`;

const H2 = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 44px 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(133, 76, 230, 0.2);
`;

const H3 = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 32px 0 12px;
`;

const H4 = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 24px 0 10px;
`;

const BQ = styled.blockquote`
  border-left: 3px solid ${({ theme }) => theme.primary};
  margin: 28px 0;
  padding: 14px 24px;
  background: rgba(133, 76, 230, 0.06);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  line-height: 1.7;
`;

const CodeBlock = styled.pre`
  background: #0d0d14;
  border: 1px solid rgba(133, 76, 230, 0.2);
  border-radius: 10px;
  padding: 24px;
  overflow-x: auto;
  margin: 24px 0;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.7;
  color: #c9d1d9;
`;

const InlineCode = styled.code`
  background: rgba(133, 76, 230, 0.12);
  color: ${({ theme }) => theme.primary};
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 15px;
`;

const HR = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.08);
  margin: 36px 0;
`;

const UL = styled.ul`
  margin: 0 0 20px 0;
  padding-left: 28px;
`;

const OL = styled.ol`
  margin: 0 0 20px 0;
  padding-left: 28px;
`;

const LI = styled.li`
  font-size: 18px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 28px 0;
  font-size: 15px;
  border-radius: 8px;
  overflow: hidden;
`;

const TH = styled.th`
  padding: 12px 16px;
  text-align: left;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  background: rgba(133, 76, 230, 0.15);
  border-bottom: 1px solid rgba(133, 76, 230, 0.3);
`;

const TD = styled.td`
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 15px;
`;

const NotFound = styled.div`
  display: flex; justify-content: center; align-items: center;
  height: 100vh; color: ${({ theme }) => theme.text_primary}; font-size: 24px;
`;

// ─── Inline markdown parser ───────────────────────────────────────
function parseInline(text, key = 0) {
  // Handle bold+italic, bold, italic, inline code, images, links
  const parts = [];
  const re = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0, m, idx = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={idx++}><em>{m[2]}</em></strong>);
    else if (m[3]) parts.push(<strong key={idx++}>{m[3]}</strong>);
    else if (m[4]) parts.push(<em key={idx++} style={{ color: 'inherit', fontStyle: 'italic' }}>{m[4]}</em>);
    else if (m[5]) parts.push(<InlineCode key={idx++}>{m[5]}</InlineCode>);
    else if (m[7]) parts.push(<img key={idx++} src={m[7]} alt={m[6]} style={{ maxWidth: '100%', borderRadius: '8px', margin: '20px 0' }} />);
    else if (m[8]) parts.push(<a key={idx++} href={m[9]} target="_blank" rel="noopener noreferrer" style={{ color: '#854CE6', textDecoration: 'none' }}>{m[8]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
}

// ─── Full markdown renderer ───────────────────────────────────────
function MarkdownRenderer({ content }) {
  const lines = content.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push(<CodeBlock key={i}>{codeLines.join('\n')}</CodeBlock>);
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('#### ')) { blocks.push(<H4 key={i}>{parseInline(line.slice(5))}</H4>); i++; continue; }
    if (line.startsWith('### ')) { blocks.push(<H3 key={i}>{parseInline(line.slice(4))}</H3>); i++; continue; }
    if (line.startsWith('## ')) { blocks.push(<H2 key={i}>{parseInline(line.slice(3))}</H2>); i++; continue; }
    if (line.startsWith('# ')) { blocks.push(<H2 key={i}>{parseInline(line.slice(2))}</H2>); i++; continue; }

    // HR
    if (line.trim() === '---' || line.trim() === '***') { blocks.push(<HR key={i} />); i++; continue; }

    // Blockquote
    if (line.startsWith('> ')) {
      const bqLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        bqLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push(<BQ key={i}>{bqLines.map((l, j) => <span key={j}>{parseInline(l)}<br /></span>)}</BQ>);
      continue;
    }

    // Table
    if (line.includes('|') && lines[i + 1] && lines[i + 1].match(/^\|[-| :]+\|$/)) {
      const headers = line.split('|').filter(c => c.trim()).map(c => c.trim());
      i += 2; // skip separator
      const rows = [];
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').filter(c => c.trim()).map(c => c.trim()));
        i++;
      }
      blocks.push(
        <Table key={i}>
          <thead><tr>{headers.map((h, j) => <TH key={j}>{parseInline(h)}</TH>)}</tr></thead>
          <tbody>{rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <TD key={ci}>{parseInline(cell)}</TD>)}</tr>)}</tbody>
        </Table>
      );
      continue;
    }

    // Unordered list
    if (line.match(/^[-*+] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*+] /)) {
        items.push(<LI key={i}>{parseInline(lines[i].slice(2))}</LI>);
        i++;
      }
      blocks.push(<UL key={i}>{items}</UL>);
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(<LI key={i}>{parseInline(lines[i].replace(/^\d+\. /, ''))}</LI>);
        i++;
      }
      blocks.push(<OL key={i}>{items}</OL>);
      continue;
    }

    // Empty line — skip
    if (line.trim() === '') { i++; continue; }

    // Paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].match(/^#{1,6} /) &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('```') &&
      !(lines[i].includes('|') && lines[i + 1] && lines[i + 1].match(/^\|[-| :]+\|$/)) &&
      !lines[i].match(/^[-*+] /) &&
      !lines[i].match(/^\d+\. /) &&
      lines[i].trim() !== '---' &&
      lines[i].trim() !== '***'
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push(<Para key={i}>{parseInline(paraLines.join(' '))}</Para>);
    } else {
      // Failsafe: if we hit a weird edge case, just render it and move on to prevent infinite loop
      blocks.push(<Para key={i}>{parseInline(lines[i])}</Para>);
      i++;
    }
  }

  return <>{blocks}</>;
}

// ─── BlogPost Component ───────────────────────────────────────────
const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === parseInt(id));

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!blog) return <NotFound>Blog post not found.</NotFound>;

  return (
    <Container>
      <CoverImage
        src={blog.coverImage}
        alt={blog.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <BackButton onClick={() => navigate('/blog')}>
          <ArrowBackIcon fontSize="small" /> Back to Blog
        </BackButton>

        <TagRow>
          {blog.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </TagRow>

        <PostTitle>{blog.title}</PostTitle>

        <Meta>
          <AuthorAvatar src={hero_img} alt={Bio.name} />
          <div>
            <AuthorName>{Bio.name}</AuthorName><br />
            <DateReadTime>{blog.date} · {blog.readTime}</DateReadTime>
          </div>
        </Meta>

        <ContentArea>
          <MarkdownRenderer content={blog.content} />
        </ContentArea>
      </ContentWrapper>
    </Container>
  );
};

export default BlogPost;

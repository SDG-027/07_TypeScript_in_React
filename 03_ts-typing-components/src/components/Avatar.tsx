// components/Avatar.tsx
// This component should receive `url` (string) and `altText` (string)

interface Props {
  url?: string;
  altText?: string;
}

const Avatar = ({ url, altText }: Props) => {
  return <img src={url ?? 'https://placeholderimage'} alt={altText ?? ''} />;
};

export default Avatar;

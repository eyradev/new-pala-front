import Image from 'next/image';
import logoCart from 'public/images/cart.svg';
import logoIcon from 'public/images/logoCart.svg';
import logoFull from 'public/images/logoFull.svg';
import logoHorizontal from 'public/images/logoText.svg';
import logoTypography from 'public/images/logoTypography.svg';

export interface LogoProps {
  variant: 'horizontal' | 'full' | 'icon' | 'typography' | 'cart';
}

export default function Logo({ variant }: LogoProps) {
  let img;
  switch (variant) {
    case 'horizontal':
      img = logoHorizontal;
      break;
    case 'full':
      img = logoFull;
      break;
    case 'typography':
      img = logoTypography;
      break;
    case 'cart':
      img = logoCart;
      break;
    default:
      img = logoIcon;
      break;
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image src={img} layout="responsive" objectFit="contain" priority />
    </div>
  );
}

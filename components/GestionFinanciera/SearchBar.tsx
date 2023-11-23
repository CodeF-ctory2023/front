import SearchIcon from '@mui/icons-material/Search';
import { InputBase, alpha, styled } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  color: '#909090',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const SearchBar = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon></SearchIcon>
      </SearchIconWrapper>
      <StyledInputBase placeholder='Buscar...'></StyledInputBase>
    </Search>
  );

  // <div
  //   className={`sm:bg-slate-200 bg-none flex items-start py-2 px-2 sm:w-6/12 gap-3 sm:hover:cursor-auto hover:cursor-pointer ${
  //     focused && 'w-min flex bg-slate-200'
  //   }`}
  //   onFocus={() => setFocused(true)}
  //   onBlur={() => setFocused(false)}
  // >
  //   <Image
  //     className={`sm:inline hidden`}
  //     src='/search.svg'
  //     width={24}
  //     height={24}
  //     alt=''
  //   ></Image>
  //   <Image
  //     className={`sm:hidden ${focused && 'hidden'}`}
  //     src='/search-white.svg'
  //     width={24}
  //     height={24}
  //     alt=''
  //     onClick={() => {
  //       setFocused(true);
  //       setTimeout(() => document.getElementById('search-bar')?.focus());
  //     }}
  //   ></Image>
  //   <input
  //     id='search-bar'
  //     type='search'
  //     className={`bg-slate-200 focus:outline-none sm:inline sm:w-full min-w-min ${
  //       focused ? 'inline' : 'hidden'
  //     }`}
  //     placeholder='Buscar en SSMU'
  //   />
  // </div>
};

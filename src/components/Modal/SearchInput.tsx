import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';

// 임시 데이터 (추후에 장소 API )
const destinations = [
  '부산', '서울', '제주도', '경주', '여수', '전주', '속초', '강릉'
];

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px; // 검색창 최대 크기 설정
  margin-bottom: 20px;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #aaa;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px; // 아이콘이 들어갈 공간을 확보하기 위해 왼쪽 패딩 추가
  border: 1px solid #ddd;
  border-radius: 25px; // 둥근 모서리
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // 약간의 그림자 효과

  &:focus {
    border-color: #999; // 포커스 시 테두리 색상 변경
  }
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0 0 8px 8px;
  max-height: 150px; // 최대 높이 설정
  overflow-y: auto; // 스크롤이 가능하도록 설정
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const SuggestionItem = styled.li<{ isActive: boolean }>`
  padding: 10px;
  background-color: ${({ isActive }) => (isActive ? '#d9d9d9' : 'transparent')}; // 선택된 항목 강조
  color: ${({ isActive }) => (isActive ? '#333' : '#555')}; // 선택된 항목 텍스트 색상
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0; // 항목에 마우스 호버 시 색상
  }
`;

const SearchInput: React.FC<{ value: string, onChange: (value: string) => void }> = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(query);

    if (query.length > 0) {
      const filteredSuggestions = destinations.filter(destination =>
        destination.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestionIndex(prevIndex => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
      }
    }
  };

  return (
    <SearchInputWrapper>
      <SearchIcon />
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="여행지 검색"
      />
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={suggestion}
              isActive={index === activeSuggestionIndex}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </SearchInputWrapper>
  );
};

export default SearchInput;

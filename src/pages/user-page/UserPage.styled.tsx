import styled from "styled-components";

export const UserCard = styled.div`
  @apply bg-white shadow-lg rounded-2xl p-6 text-center;
`;

export const UserName = styled.h1`
  @apply text-2xl font-semibold text-gray-800;
`;

export const UserEmail = styled.p`
  @apply text-gray-500;
`;

export const UserRole = styled.p`
  @apply text-gray-600 mt-2 capitalize;
`;

export const QRContainer = styled.div`
  @apply mt-4 p-4 bg-gray-100 rounded-xl;
`;

export const Button = styled.button`
  @apply mt-5 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition;
`;
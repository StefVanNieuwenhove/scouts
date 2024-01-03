import { axios } from '.';
import { Member } from '../types';

export const getMembers = async (): Promise<Member[]> => {
  try {
    const members = await axios.get('members', { withCredentials: true });
    return members.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMember = async (id: string): Promise<Member> => {
  try {
    const member = await axios.get(`members/${id}`, { withCredentials: true });
    return member.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMembersByTak = async (tak: string): Promise<Member[]> => {
  try {
    const members = await axios.get(`members/tak/${tak}`, {
      withCredentials: true,
    });
    return members.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTakkenOfMembers = async (): Promise<string[]> => {
  try {
    const takken = await axios.get('members/takken', { withCredentials: true });
    return takken.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMember = async (member: Member): Promise<Member> => {
  try {
    console.log(member);
    const newMember = await axios.post('members', member, {
      withCredentials: true,
    });
    return newMember.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteMember = async (id: string): Promise<void> => {
  try {
    await axios.delete(`members/${id}`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

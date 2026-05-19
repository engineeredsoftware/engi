export const supabaseAdmin = {
  from: jest.fn(() => {
    const query = {
      select: jest.fn(),
      eq: jest.fn(),
      maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null }),
    };
    query.select.mockImplementation(() => query);
    query.eq.mockImplementation(() => query);
    return query;
  }),
};

# Support

## Getting Help

If you need help with TrustCare, please follow these steps:

### 1. Check the Documentation
- [README.md](README.md) - Main documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

### 2. Search Existing Issues
- Check [GitHub Issues](https://github.com/Moses-main/TrustCare/issues)
- Search for similar problems others may have faced

### 3. Create a New Issue
If you can't find a solution, create a new issue with:

**Bug Reports:**
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

**Feature Requests:**
- Clear description of the feature
- Use cases
- Any relevant mockups or examples

**Questions:**
- Detailed question
- What you've tried
- Relevant code snippets

### 4. Community Channels
- GitHub Discussions
- Stack Overflow (tag: trustcare)

---

## Common Issues & Solutions

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or update MONGO_URI in backend/.env

### Privy Modal Not Loading
**Solution:**
1. Verify VITE_PRIVY_APP_ID is set in frontend/.env
2. Check browser console for errors
3. Verify app is configured in Privy dashboard

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf frontend/node_modules backend/node_modules
cd frontend && npm install
cd ../backend && npm install
```

### Port Already in Use
```bash
# Find process using port
lsof -i :4500  # backend
lsof -i :5173  # frontend

# Kill process
kill -9 <PID>
```

---

## Reporting Security Vulnerabilities

For security issues, please email directly instead of opening a public issue.

---

## Response Time

- Bug reports: Within 48 hours
- Feature requests: Within 1 week
- General questions: Within 1 week

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Privy Documentation](https://docs.privy.io)
- [Solidity Documentation](https://docs.soliditylang.org)

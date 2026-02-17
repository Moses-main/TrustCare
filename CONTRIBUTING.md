# Contributing to TrustCare

Thank you for your interest in contributing to TrustCare!

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Use the bug report template
3. Include detailed steps to reproduce
4. Include your environment details

### Suggesting Features

1. Check existing feature requests
2. Describe the feature in detail
3. Explain why this feature would be useful
4. Include any mockups or examples

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Add tests if applicable
5. Ensure code follows style guidelines
6. Commit with clear messages: `git commit -m 'Add feature'`
7. Push to your fork: `git push origin feature/my-feature`
8. Create a Pull Request

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- MongoDB
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/Moses-main/TrustCare.git
cd TrustCare

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start development servers
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

## Coding Standards

### JavaScript/React
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### Backend (Node.js/Express)
- Use async/await for async operations
- Follow RESTful conventions
- Validate all inputs
- Handle errors properly

### Smart Contracts (Solidity)
- Follow Solidity best practices
- Add NatSpec comments
- Write comprehensive tests
- Optimize gas usage

### Git Commit Messages
- Use imperative mood
- Start with verb (Add, Fix, Update, Remove)
- Keep subject line under 50 characters
- Reference issues where applicable

Example:
```
Add patient dashboard component

- Created dashboard layout with health metrics
- Added appointment list view
- Integrated with blockchain service
Fixes #123
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the CHANGELOG if applicable
5. Request review from maintainers

## Categories for Contributions

- **Frontend**: React components, pages, styling
- **Backend**: API routes, controllers, models
- **Blockchain**: Smart contracts, Web3 integration
- **Documentation**: README, guides, API docs
- **Testing**: Unit tests, integration tests
- **Bug Fixes**: Bug patches and corrections

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub repository insights
- Release notes

## Questions?

Feel free to open an issue for questions about contributing.

---

Thank you for contributing to TrustCare!
